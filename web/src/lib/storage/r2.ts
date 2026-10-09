import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

const ALLOWED_IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const ALLOWED_DOC_MIME = new Set(["application/pdf"]);

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

let client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (client) return client;
  client = new S3Client({
    region: process.env.S3_REGION || "auto",
    endpoint: requireEnv("S3_ENDPOINT"),
    credentials: {
      accessKeyId: requireEnv("S3_ACCESS_KEY"),
      secretAccessKey: requireEnv("S3_SECRET"),
    },
    forcePathStyle: true,
  });
  return client;
}

export function publicBaseUrl(): string {
  return requireEnv("S3_PUBLIC_BASE_URL").replace(/\/$/, "");
}

export function publicObjectUrl(key: string): string {
  return `${publicBaseUrl()}/${key}`;
}

function extForMime(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "application/pdf") return "pdf";
  return "bin";
}

export type UploadPhotoInput = {
  listingId: string;
  bytes: Buffer;
  mimeType: string;
  sortOrder?: number;
};

export async function uploadListingPhoto(input: UploadPhotoInput) {
  if (!ALLOWED_IMAGE_MIME.has(input.mimeType)) {
    throw new Error("MIME_NOT_ALLOWED");
  }

  const key = `listings/${input.listingId}/photos/${randomUUID()}.${extForMime(input.mimeType)}`;
  const bucket = requireEnv("S3_BUCKET_PUBLIC");

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: input.bytes,
      ContentType: input.mimeType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return {
    key,
    url: publicObjectUrl(key),
    mimeType: input.mimeType,
    sizeBytes: input.bytes.byteLength,
    storage: "PUBLIC" as const,
    kind: "PHOTO" as const,
  };
}

export type UploadVaultInput = {
  mandateId: string;
  bytes: Buffer;
  mimeType: string;
};

export async function uploadMandatePdf(input: UploadVaultInput) {
  if (!ALLOWED_DOC_MIME.has(input.mimeType)) {
    throw new Error("MIME_NOT_ALLOWED");
  }

  const key = `mandates/${input.mandateId}/docs/${randomUUID()}.pdf`;
  const bucket = requireEnv("S3_BUCKET_VAULT");

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: input.bytes,
      ContentType: input.mimeType,
      // private — no public ACL
    }),
  );

  return {
    key,
    url: null as string | null,
    mimeType: input.mimeType,
    sizeBytes: input.bytes.byteLength,
    storage: "VAULT" as const,
    kind: "DOCUMENT" as const,
  };
}

export async function deletePublicObject(key: string) {
  await getR2Client().send(
    new DeleteObjectCommand({
      Bucket: requireEnv("S3_BUCKET_PUBLIC"),
      Key: key,
    }),
  );
}

export function isAllowedImageMime(mime: string) {
  return ALLOWED_IMAGE_MIME.has(mime);
}

export function isAllowedDocMime(mime: string) {
  return ALLOWED_DOC_MIME.has(mime);
}

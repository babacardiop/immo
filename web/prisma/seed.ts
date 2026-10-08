import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (
    process.env.SEED_AGENT_EMAIL ?? "agent@evergreen.sn"
  ).toLowerCase();
  const password = process.env.SEED_AGENT_PASSWORD ?? "ChangeMeStaging1!";
  const passwordHash = await bcrypt.hash(password, 12);

  const agent = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: UserRole.AGENT,
      name: "Agent Staging",
    },
    create: {
      email,
      name: "Agent Staging",
      role: UserRole.AGENT,
      passwordHash,
    },
  });

  console.log(`Seeded agent: ${agent.email} (${agent.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

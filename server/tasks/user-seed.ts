import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

async function main() {
    // User: Check if any of these users already exist
    const existingUser = await prisma.user.findFirst({
        where: {
            email: { in: ["ineffable@qualia.flux", "navigator@qualia.flux", "guide@qualia.flux"] }
        }
    });

    if (existingUser) {
        console.log("User already exists:", existingUser);
        return;
    }

    console.log("Seeding new users...");

    // Pasword: Hash passwords
    const hashedPasswordAdmin = await bcrypt.hash("Qu4l!4C0nsc10usn3ss", 10);
    const hashedPasswordOfficer = await bcrypt.hash("1n3ff4bl3P4thw4ys", 10);

    // User: Prepare user data
    const userData: Prisma.UserCreateInput[] = [
        {
            fullname: "Dr. Sophia Mindscape",
            username: "navigator_qualia",
            email: "navigator@qualia.flux",
            password: hashedPasswordAdmin,
            phone: "+1-702-544-9023",
            gender: "Female",
            birthdate: new Date(),
            role: "ADMINISTRATOR",
            photo: null,
            address: "88 Consciousness Circle, Perception Vale, PV 45Q2",
            is_verify: true,
            is_active: true,
            last_login: null
        },
        {
            fullname: "Elias Perception",
            username: "guide_ineffable",
            email: "guide@qualia.flux",
            password: hashedPasswordOfficer,
            phone: "+1-702-544-9024",
            gender: "Male",
            birthdate: new Date(),
            role: "PETUGAS",
            photo: null,
            address: "34 Subjective Avenue, Perception Vale, PV 45Q2",
            is_verify: true,
            is_active: true,
            last_login: null
        }
    ];

    // User: Create multiple users
    await prisma.user.createMany({
        data: userData
    });

    console.log("Users seeded successfully.");
}

// System: Execute seed script
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});

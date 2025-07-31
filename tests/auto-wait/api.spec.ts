import { expect, test } from "@playwright/test";
import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// ✅ Load .env from current directory
dotenv.config({ path: path.resolve(__dirname, ".env") });

test("[Post] login user", async ({ request }) => {
  const response = await request.post(
    "https://thinking-tester-contact-list.herokuapp.com/users/login",
    {
      data: {
        email: "guptaparul652@gmail.com",
        password: "Qwertyuiop",
      },
    }
  );

  await expect(response).toBeOK();
  const responseBody = await response.json();
  console.log("Token:", responseBody.token);

  // ✅ Write token to tests/auto-wait/.env
  const envPath = path.resolve(__dirname, ".env");
  fs.writeFileSync(envPath, `TOKEN=${responseBody.token}`);

  // ✅ Schema validation
  const schema = z.object({
    user: z.object({
      _id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      __v: z.number(),
    }),
    token: z.string(),
  });

  const parsed = schema.safeParse(responseBody);
  expect(parsed.success).toBe(true);
});

test("get the user profile", async ({ request }) => {
  console.log("Using token:", process.env.TOKEN);

  const response = await request.get(
    "https://thinking-tester-contact-list.herokuapp.com/contacts",
    {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );

  expect(response.status()).toBe(200);

  const json = await response.json();
  console.log("Response JSON:", json);
});

//Option 1: Store the token in memory in the same file (simple, no .env)
// import { expect, test } from "@playwright/test";
// import { z } from "zod";

// let authToken: string; // ✅ store token in memory

// test("[Post] login user", async ({ request }) => {
//   const response = await request.post(
//     "https://thinking-tester-contact-list.herokuapp.com/users/login",
//     {
//       data: {
//         email: "guptaparul652@gmail.com",
//         password: "Qwertyuiop",
//       },
//     }
//   );

//   await expect(response).toBeOK();
//   const responseBody = await response.json();
//   console.log("Token:", responseBody.token);

//   // ✅ store in-memory
//   authToken = responseBody.token;

//   const schema = z.object({
//     user: z.object({
//       _id: z.string(),
//       firstName: z.string(),
//       lastName: z.string(),
//       email: z.string(),
//       __v: z.number(),
//     }),
//     token: z.string(),
//   });

//   const parsed = schema.safeParse(responseBody);
//   expect(parsed.success).toBe(true);
// });

// test("get the user profile", async ({ request }) => {
//   console.log("Using token:", authToken); // ✅ use from memory

//   const response = await request.get(
//     "https://thinking-tester-contact-list.herokuapp.com/contacts",
//     {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     }
//   );

//   const raw = await response.text();
//   try {
//     const json = JSON.parse(raw);
//     console.log("Response JSON:", json);
//     expect(response.status()).toBe(200);
//   } catch (e) {
//     const err = e as Error;
//     console.error("❌ Failed to parse JSON:", err.message);
//     console.log("Raw response:", raw);
//     throw e;
//   }
// });

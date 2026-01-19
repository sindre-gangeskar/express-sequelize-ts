import { seed } from "lib/db";
(async () => {
  await seed();
  console.info("Database seed finished.")
})()
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "7mczzfen",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skQzPAVmJHBPv8QUHYOa27GDwajclsTHtho2SjEzCpEX2uGT8S516LpbiIzO1wcObNyxqVx6Ap8tkqOUEdRRJUF2lKtMlNkbniwo2z8mtsRljW6L6AavIylzlDBkpC5Y0PwBGt5cihgGCZHahPXbxGh9N6BT8aIaUnz1JnujRRVFjxyuOCjZ",
  useCdn: false,
});

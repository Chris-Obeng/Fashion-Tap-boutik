import { z } from "zod";
const phonePattern = /^0(?:2|5)\d{8}$/;
export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Please tell us your name.").max(80, "That name is a little too long."),
  phone: z.string().trim().refine(value => phonePattern.test(value.replace(/[\s-]/g, "")), "Use a Ghana mobile number, e.g. 024 123 4567."),
  email: z.string().trim().email("That email doesn’t look right.").optional().or(z.literal("")),
  method: z.enum(["delivery", "pickup"]),
  address: z.string().trim().max(160, "Please keep the address a little shorter.").optional(),
  area: z.string().optional(),
  notes: z.string().trim().max(250, "Please keep notes under 250 characters.").optional(),
}).superRefine((data, ctx) => {
  if (data.method === "delivery") {
    if (!data.address || data.address.length < 5) ctx.addIssue({ code: "custom", path: ["address"], message: "Please add your delivery address." });
    if (!data.area) ctx.addIssue({ code: "custom", path: ["area"], message: "Please choose your area." });
  }
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;

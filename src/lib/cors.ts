import cors from "cors";

export const origins = [
  "http://localhost:5173",
  process.env.EXCEL_VISUALIZER_URL!,
];

export const corsConfig = cors({
  origin: origins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

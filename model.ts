import {
  model,
  Schema,
} from "mongoose";

export const MetricName = {
  default: "default"
} as const
export type MetricName = typeof MetricName[keyof typeof MetricName]

const labelsSchema = new Schema({
  label1: { type: String, required: true },
  label2: { type: String, required: true },
})

const metricSchema = new Schema({
  __name__: { type: String, enum: Object.values(MetricName), default: "default" },
  ts: { type: Date, default: () => new Date() },
  labels: labelsSchema,
  value: { type: Object, default: () => new Date() },
}, {
  timeseries: {
    timeField: "ts",
    metaField: "labels",
    granularity: "seconds"
  },
  autoCreate: false,
  expireAfterSeconds: 86400
})

export function getModel() {
  return model("Metric", metricSchema)
}

import { connect } from "mongoose"

import { getModel, MetricName } from "./model"

const connectDB = async() => {
  await connect("mongodb://mongo:27017/mp")
}

const cleanup = async() => {
  const Metric = getModel()

  await Metric.deleteMany()
}

const main = async() => {
  const Metric = getModel()

  console.log("-- Insert Many")
  console.log(await Metric.insertMany([
    {
      __name__: MetricName.default,
      labels: {
        label1: "sample_1",
        label2: "sample_2",
      },
    },
    {
      __name__: MetricName.default,
      labels: {
        label1: "sample_1",
        label2: "sample_2",
      },
    },
  ]))

  console.log("-- Find")
  console.log(await Metric.find())

  await cleanup()
}

(async() => {
  // DB Connection
  console.info("Connecting to mongo...")
  try {
    await connectDB()
  }
  catch (err) {
    console.error("Failed to connect to DB.", err)
    return
  }
  console.info("Successfully connected to mongo.")

  // Main
  console.info("Running main function...")
  await main()
  console.info("Successfully ran main.")
})().then(() => {
  process.exit(0)
}).catch((err) => {
  console.error("ERROR:::", err)
  process.exit(1)
})

import { Worker, Job } from "bullmq";
import { deleteBannerImageFromCloudinary } from "../lib/cloudinary";
import { bullmqConnection } from "../lib/redis";
import { logger } from "../lib/logger";

const QUEUE_NAME = "cloudinary-jobs";
const DELETE_CLOUDINARY_IMAGE_JOB = "delete-cloudinary-image";

type DeleteCloudinaryImageJobData = {
    publicId: string;
};

export const deleteCloudinaryImageWorker = new Worker(
    QUEUE_NAME,
    async (job: Job<DeleteCloudinaryImageJobData>) => {
        if (job.name !== DELETE_CLOUDINARY_IMAGE_JOB) {
            return;
        }

        const data = job.data;
        await deleteBannerImageFromCloudinary(data.publicId);
    },
    {
        connection: bullmqConnection,
    }
);

deleteCloudinaryImageWorker.on("completed", (job: Job) => {
    logger.info(`cloudinary delete job completed : ${job.id}`);
});

deleteCloudinaryImageWorker.on("failed", (job: Job | undefined, error: Error) => {
    logger.error(
        {
            err: error,
            jobId: job?.id,
        },
        `cloudinary delete job failed`
    );
});

deleteCloudinaryImageWorker.on("error", (error: Error) => {
    logger.error({ err: error }, `cloudinary worker connection error`);
});

logger.info("delete cloudinary image worker started");

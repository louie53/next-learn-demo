'use server';

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } });

        return JSON.parse(JSON.stringify(similarEvents));
    } catch (error) {
        console.error(error);
    }
}

export const getAllEvents = async () => {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });

        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error('getAllEvents failed', error);
        // Return empty array as a safe fallback during build or when DB is unreachable
        return [];
    }
};
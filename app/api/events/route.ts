import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({ message: "Invalid JSON data format" }, { status: 400 });
        }

        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ message: "image file is required" }, { status: 400 })
        }

        const tags = JSON.parse(formData.get('tags') as string);
        const agenda = JSON.parse(formData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const creatEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda
        });

        return NextResponse.json({ message: "Event created successfully", event: creatEvent }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Internal Server Error", error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (error) {
        const err = error as unknown as Error;
        const safeMessage = err?.message ?? 'Unknown error';
        console.error('Error fetching events:', err);
        return NextResponse.json({ message: 'Event fetching failed', error: safeMessage }, { status: 500 });
    }
}


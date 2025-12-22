import { IEvent } from '@/database';
import { getSimilarEventsBySlug, getEventBySlug } from '@/lib/actions/event.actions';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BookEvent from './BookEvent';
import EventCard from './EventCard';


const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
    return (
        <div className='flex-row-gap-2 items-center'>
            <Image src={icon} alt={alt} width={17} height={17} />
            <p>{label}</p>
        </div>
    )
}

const EventAgendaItem = ({ agendaItems }: { agendaItems: string[] }) => {
    return (
        <div className='agenda'>
            <h2>Agenda</h2>
            <ul>
                {agendaItems.map((item) => {
                    return (
                        <li key={item}>{item}</li>
                    )
                })}
            </ul>
        </div>
    )
}

const EventTags = ({ tags }: { tags: string[] }) => {
    return (
        <div className='flex flex-row gap-1.5 flex-wrap'>
            {tags.map((tag) => {
                return (
                    <div className='pill' key={tag}>{tag}</div>
                )
            })}
        </div>
    )
}
const EventDetail = async ({ params }: { params: Promise<string> }) => {
    'use cache';
    cacheLife('hours');
    const slug = await params;
    let event;
    try {
        event = await getEventBySlug(slug);
        if (!event) return notFound();
    } catch (error) {
        console.log('error fetching event by slug', error);
        return notFound();
    }
    const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer } = event;
    if (!description) return notFound();


    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
    return (
        <section id="event">
            <div className='header'>
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className='details'>
                <div className='content'>
                    <Image src={image} alt=" Event Banner" width={800} height={400} className="banner" />

                    <section className='flex-col-gap-2'>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className='flex-col-gap-2'>
                        <h2>Event Details</h2>
                        < EventDetailItem icon='/icons/calendar.svg' alt='calendar' label={date} />
                        < EventDetailItem icon='/icons/clock.svg' alt='clock' label={time} />
                        < EventDetailItem icon='/icons/pin.svg' alt='location' label={location} />
                        < EventDetailItem icon='/icons/mode.svg' alt='mode' label={mode} />
                        < EventDetailItem icon='/icons/audience.svg' alt='audience' label={audience} />
                    </section>


                    <EventAgendaItem agendaItems={agenda} />

                    <section className='flex-col-gap-2'>
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />
                </div>
                <aside className='booking'>
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className='text-sm'>Join {bookings} people who have already registered.</p>
                        ) : (
                            <p className='text-sm'>Be the first to book now.</p>
                        )}

                        <BookEvent eventId={event._id} slug={event.slug} />
                    </div>
                </aside>
            </div>
            <div className='flex w-full flex-col gap-4 pt-20'>
                <h2>Similar Events</h2>
                <div className='events'>
                    {similarEvents.length > 0 && similarEvents.map((event: IEvent) => {
                        return (
                            <EventCard key={event._id.toString()} {...event} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default EventDetail

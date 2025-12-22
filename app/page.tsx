import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { getAllEvents } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";


const Page = async () => {
  'use cache';
  cacheLife('hours');
  // Use direct DB helper on the server instead of fetching our own API route.
  // getAllEvents returns [] when DB is unreachable (safe for build-time).
  const events = await getAllEvents();
  return (
    <section >
      <h1 className="text-center">The Hub for Every Dev <br /> Event You can&apos;t miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li className="list-none" key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Page;
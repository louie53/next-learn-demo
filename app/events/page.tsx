
import EventCard from '@/components/EventCard';

type ApiEvent = {
  _id?: string;
  id?: string;
  slug: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
};

const page = async () => {
  try {
    const res = await fetch('/api/events');

    if (!res.ok) {
      throw new Error(`Failed to fetch events (${res.status})`);
    }

    const payload = await res.json();
    const events: ApiEvent[] = payload?.events ?? [];

    if (!events || events.length === 0) {
      return (
        <main style={{ padding: '1.25rem' }}>
          <h1>Events</h1>
          <p>No events found.</p>
        </main>
      );
    }

    return (
      <main style={{ padding: '1.25rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Events</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            alignItems: 'start',
          }}
        >
          {events.map((ev) => (
            <EventCard
              key={ev._id ?? ev.id ?? ev.slug}
              title={ev.title}
              image={ev.image}
              slug={ev.slug}
              location={ev.location}
              date={ev.date}
              time={ev.time}
            />
          ))}
        </div>
      </main>
    );
  } catch (err) {
    const error = err as unknown as Error;
    const safeMessage = error?.message ?? 'Unknown error';
    console.error('Events page error:', error);

    return (
      <main style={{ padding: '1.25rem' }}>
        <h1>Events</h1>
        <p>Unable to load events: {safeMessage}</p>
      </main>
    );
  }
};

export default page;

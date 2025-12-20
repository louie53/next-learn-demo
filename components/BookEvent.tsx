'use client';
import { useState } from 'react';

const BookEvent = () => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };
    return (
        <div id="book-event">
            {submitted ? (
                <p>Thank you for booking your spot!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='button-submit' type="submit">Book Now</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default BookEvent;

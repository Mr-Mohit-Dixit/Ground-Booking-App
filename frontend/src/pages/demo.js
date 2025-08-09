import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlayerNavbar from './PlayerNavbar';
import '../Styles/bookingform.css';

const BookingForm = () => {
    const { groundId } = useParams();
    const navigate = useNavigate();

    const [ground, setGround] = useState(null);
    const [slots, setSlots] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({
        uId: null, 
        gId: groundId,
        bDate: '',
        timeFrom: '',
        timeTo: '',
        bAmt: 0 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const hourlySlots = [];
                for (let i = 0; i < 24; i++) {
                    const hour = String(i).padStart(2, '0');
                    hourlySlots.push(${hour}:00);
                }
                setSlots(hourlySlots);

                const groundResponse = await axios.get(http://localhost:8080/api/grounds/getById/${groundId});
                const groundData = groundResponse.data;
                setGround(groundData);
                
                const userId = localStorage.getItem("loggeduserid");
                setBookingDetails(prevDetails => ({
                    ...prevDetails,
                    uId: userId,
                    bAmt: 0 
                }));

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load booking form. Ground or user details are missing.");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [groundId]);

    useEffect(() => {
        const calculateAmount = () => {
            const { timeFrom, timeTo } = bookingDetails;
            if (timeFrom && timeTo && ground) {
                const startTime = new Date(2000-01-01T${timeFrom});
                const endTime = new Date(2000-01-01T${timeTo});

                if (endTime <= startTime) {
                    setBookingDetails(prevDetails => ({ ...prevDetails, bAmt: 0 }));
                    return;
                }

                const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
                const hourlyRate = ground.sport?.srate || 0;
                const totalAmount = durationInHours * hourlyRate;
                
                setBookingDetails(prevDetails => ({
                    ...prevDetails,
                    bAmt: totalAmount
                }));
            } else {
                setBookingDetails(prevDetails => ({ ...prevDetails, bAmt: 0 }));
            }
        };

        calculateAmount();
    }, [bookingDetails.timeFrom, bookingDetails.timeTo, ground]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!bookingDetails.bDate || !bookingDetails.timeFrom || !bookingDetails.timeTo || bookingDetails.bAmt <= 0) {
            alert('Please select a date and a valid time slot to proceed.');
            return;
        }

        const bookingData = {
            uId: bookingDetails.uId,
            gId: bookingDetails.gId,
            bDateTime: ${bookingDetails.bDate}T${bookingDetails.timeFrom}:00,
            timeFrom: bookingDetails.timeFrom,
            timeTo: bookingDetails.timeTo,
            bAmt: bookingDetails.bAmt
        };

        try {
            // This is the key change: Matching the endpoint from your BookingController
            await axios.post('http://localhost:8080/api/bookings/addBooking', bookingData);
            alert('Ground booked successfully!');
            navigate('/my-bookings');
        } catch (err) {
            console.error("Booking error:", err);
            alert('Failed to book the ground. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading-message">Loading form...</div>;
    }

    if (error || !ground) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
            <PlayerNavbar />
            <div className="booking-form-container">
                <div className="booking-card">
                    <h2>Book Your Slot at {ground.gName}</h2>
                    <p>Sport: {ground.sport?.sname}</p>
                    <p>Rate: ₹{ground.sport?.srate} per hour</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="bDate">Booking Date</label>
                            <input
                                type="date"
                                id="bDate"
                                name="bDate"
                                value={bookingDetails.bDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeFrom">Start Time</label>
                            <select
                                id="timeFrom"
                                name="timeFrom"
                                value={bookingDetails.timeFrom}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Start Time</option>
                                {slots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeTo">End Time</label>
                            <select
                                id="timeTo"
                                name="timeTo"
                                value={bookingDetails.timeTo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select End Time</option>
                                {slots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Total Amount</label>
                            <span>₹{bookingDetails.bAmt}</span>
                        </div>
                        <button type="submit" className="submit-button">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingForm;
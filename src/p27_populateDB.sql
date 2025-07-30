-- Use the database
USE p27_groundbookingapp;

-- 1. Insert data into City
INSERT INTO City (cName) VALUES
('Pune'),
('Mumbai'),
('Delhi'),
('Bengaluru'),
('Chennai'),
('Hyderabad'),
('Ahmedabad'); -- New City

-- 2. Insert data into Roles
INSERT INTO Roles (rName) VALUES
('Admin'),
('Ground Owner'),
('Player');

-- 3. Insert data into Sport
INSERT INTO Sport (sName, sRate) VALUES
('Football', 500.00),
('Cricket', 750.00),
('Basketball', 400.00),
('Badminton', 300.00),
('Tennis', 600.00),
('Volleyball', 350.00), -- New Sport
('Table Tennis', 200.00); -- New Sport

-- 4. Insert data into Users
-- Assuming rId 1 = Admin, 2 = Ground Owner, 3 = Player
-- Assuming cId 1 = Pune, 2 = Mumbai, etc.
INSERT INTO Users (rId, uName, uPhoneNo, aadhar, uAddress, cId, email, username, passwords) VALUES
(1, 'Admin User', '9876543210', '123456789012', 'Admin Office, Pune', 1, 'admin@example.com', 'adminuser', 'adminpass123'),
(2, 'Ground Owner 1', '9988776655', '234567890123', 'Owner House, Mumbai', 2, 'owner1@example.com', 'groundowner1', 'ownerpass123'),
(2, 'Ground Owner 2', '9977553311', '345678901234', 'Owner Flat, Delhi', 3, 'owner2@example.com', 'groundowner2', 'ownerpass456'),
(3, 'Player John Doe', '9123456789', '456789012345', '123 Player St, Pune', 1, 'john.doe@example.com', 'johndoe', 'playerpass1'),
(3, 'Player Jane Smith', '9234567890', '567890123456', '456 Game Rd, Mumbai', 2, 'jane.smith@example.com', 'janesmith', 'playerpass2'),
(3, 'Player Mike Ross', '9345678901', '678901234567', '789 Court Ave, Bengaluru', 4, 'mikeross@example.com', 'mikeross', 'playerpass3'),
(3, 'Player Emily White', '9456789012', '789012345678', '505 Sports Complex, Hyderabad', 6, 'emily.w@example.com', 'emilyw', 'playerpass4'), -- New User
(2, 'Ground Owner 3', '9567890123', '890123456789', 'Owner Villa, Ahmedabad', 7, 'owner3@example.com', 'groundowner3', 'ownerpass789'); -- New User

-- 5. Insert data into Ground
-- Assuming uId 2, 3 = Ground Owners
-- Assuming cId 1 = Pune, 2 = Mumbai, 3 = Delhi, 4 = Bengaluru, 6 = Hyderabad, 7 = Ahmedabad
-- Assuming sId 1 = Football, 2 = Cricket, 3 = Basketball, 4 = Badminton, 5 = Tennis, 6 = Volleyball, 7 = Table Tennis
INSERT INTO Ground (gName, gDescription, address, cId, uId, sId, gStatus, gImages) VALUES
('Turf Arena', 'State-of-the-art football turf.', '101 Football Lane, Pune', 1, 2, 1, 'Active', 'turf_arena_1.jpg,turf_arena_2.jpg'),
('Cricket Ground Pro', 'Professional cricket ground with nets.', '202 Cricket Blvd, Mumbai', 2, 2, 2, 'Active', 'cricket_pro_1.jpg'),
('Hoops Court', 'Indoor basketball court with amenities.', '303 Basketball St, Delhi', 3, 3, 3, 'Active', 'hoops_court_1.jpg'),
('Badminton Hub', 'Multiple courts for badminton enthusiasts.', '404 Shuttlecock Rd, Bengaluru', 4, 3, 4, 'Active', 'badminton_hub_1.jpg'),
('Tennis Ace', 'Clay court for tennis players.', '505 Serve Lane, Pune', 1, 2, 5, 'Inactive', 'tennis_ace_1.jpg'),
('Volley Zone', 'Outdoor volleyball court with sand.', '606 Beach Road, Hyderabad', 6, 8, 6, 'Active', 'volley_zone_1.jpg'), -- New Ground
('Ping Pong Palace', 'Indoor table tennis facility.', '707 Paddle Street, Ahmedabad', 7, 8, 7, 'Active', 'ping_pong_1.jpg'); -- New Ground

-- 6. Insert data into Slots
INSERT INTO Slots (slotTime) VALUES
('08:00:00'),
('09:00:00'),
('10:00:00'),
('11:00:00'),
('12:00:00'),
('13:00:00'),
('14:00:00'),
('15:00:00'),
('16:00:00'),
('17:00:00'),
('18:00:00'),
('19:00:00'),
('20:00:00'),
('21:00:00'),
('22:00:00');

-- 7. Insert data into Request (assuming uId is added to schema)
-- uId 4 = Player John Doe, uId 5 = Player Jane Smith, uId 7 = Player Emily White
-- gId 1 = Turf Arena, gId 2 = Cricket Ground Pro, gId 3 = Hoops Court, gId 6 = Volley Zone
INSERT INTO Request (uId, gId, rqDateTime, rqStatus) VALUES
(4, 1, '2025-07-10 18:00:00', 'Pending'),
(5, 2, '2025-07-12 09:00:00', 'Approved'),
(4, 3, '2025-07-15 20:00:00', 'Denied'),
(7, 6, '2025-07-18 14:00:00', 'Pending'), -- New Request
(5, 1, '2025-07-20 19:00:00', 'Approved'); -- New Request

-- 8. Insert data into Booking
-- uId 4 = Player John Doe, uId 5 = Player Jane Smith, uId 6 = Player Mike Ross, uId 7 = Player Emily White
-- gId 1 = Turf Arena, gId 2 = Cricket Ground Pro, gId 3 = Hoops Court, gId 4 = Badminton Hub, gId 6 = Volley Zone
INSERT INTO Booking (uId, gId, bDateTime, timeFrom, timeTo, bAmt) VALUES
(4, 1, '2025-07-08', '19:00:00', '20:00:00', 500.00), -- John Doe, Turf Arena, 1 hour
(5, 2, '2025-07-09', '10:00:00', '12:00:00', 1500.00), -- Jane Smith, Cricket Ground Pro, 2 hours
(6, 3, '2025-07-11', '16:00:00', '17:30:00', 600.00), -- Mike Ross, Hoops Court, 1.5 hours
(4, 1, '2025-07-14', '20:00:00', '21:00:00', 500.00), -- John Doe, Turf Arena, another booking
(7, 4, '2025-07-16', '10:00:00', '11:00:00', 300.00), -- Emily White, Badminton Hub, 1 hour
(6, 6, '2025-07-19', '15:00:00', '16:00:00', 350.00); -- Mike Ross, Volley Zone, 1 hour

-- 9. Insert data into Feedback
-- uId 4 = Player John Doe, uId 5 = Player Jane Smith, uId 7 = Player Emily White
-- bId 1 = Booking 1, bId 2 = Booking 2, bId 5 = Booking 5
INSERT INTO Feedback (uId, bId, fText, fRating) VALUES
(4, 1, 'Great turf, well maintained!', 5),
(5, 2, 'Cricket ground was good, but changing rooms could be cleaner.', 4),
(7, 5, 'Badminton courts are excellent, good lighting.', 5), -- New Feedback
(4, 4, 'Second time booking here, still great experience.', 5); -- New Feedback

-- 10. Insert data into Queries
-- bId can be NULL
INSERT INTO Queries (bId, qType, qText, qStatus) VALUES
(1, 'Booking Issue', 'My booking for Turf Arena on 2025-07-08 was not showing up in my app history.', 'New'),
(NULL, 'General Inquiry', 'How can I list my ground on your platform?', 'In Progress'),
(2, 'Payment Issue', 'Payment failed for booking ID 2, but the ground was still booked.', 'Resolved'),
(NULL, 'Technical Support', 'App crashes when trying to view ground details.', 'New'), -- New Query
(5, 'Ground Feedback', 'Can I provide more detailed feedback on my badminton booking?', 'New'); -- New Query

-- 11. Insert data into QueryAnswer
-- Assuming qId 1 = Booking Issue, qId 2 = General Inquiry, qId 4 = Technical Support
-- uId 1 = Admin User
INSERT INTO QueryAnswer (qId, uId, qaAnsText) VALUES
(1, 1, 'Apologies for the inconvenience. We have manually updated your booking history. Please check again.'),
(2, 1, 'To list your ground, please register as a Ground Owner and navigate to the "List Ground" section in your dashboard.'),
(4, 1, 'We are aware of the app crashing issue and our team is working on a fix. Please try updating the app to the latest version.'); -- New Query Answer

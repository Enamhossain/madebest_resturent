import React, { useState, useEffect, memo } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import Loading from '../../../../Component/Loading';
import { FaCalendarAlt, FaUsers, FaClock, FaEnvelope, FaPhone, FaUtensils, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import swal from 'sweetalert';

const Reservations = memo(() => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email, filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Fetch user-specific bookings
      const response = await axiosSecure.get(`/booking/user/${user.email}`);
      let userBookings = response.data?.data || response.data || [];

      // Apply filter
      const now = new Date();
      let filteredBookings = userBookings;
      if (filter === 'upcoming') {
        filteredBookings = userBookings.filter(booking => {
          const bookingDate = new Date(booking.date);
          return bookingDate >= now;
        });
      } else if (filter === 'past') {
        filteredBookings = userBookings.filter(booking => {
          const bookingDate = new Date(booking.date);
          return bookingDate < now;
        });
      }

      setBookings(filteredBookings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback: try admin endpoint if user endpoint doesn't exist
      try {
        const response = await axiosSecure.get('/booking');
        const allBookings = response.data?.data || response.data || [];
        const userBookings = allBookings.filter(booking => 
          booking.email?.toLowerCase() === user.email?.toLowerCase()
        );
        
        const now = new Date();
        let filteredBookings = userBookings;
        if (filter === 'upcoming') {
          filteredBookings = userBookings.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= now;
          });
        } else if (filter === 'past') {
          filteredBookings = userBookings.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate < now;
          });
        }
        
        setBookings(filteredBookings);
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
        setBookings([]);
      }
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const result = await swal({
        title: 'Are you sure?',
        text: 'Do you want to cancel this reservation?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });

      if (result) {
        // Try to delete booking
        // Note: You'll need to add DELETE /booking/:id endpoint on server
        try {
          await axiosSecure.delete(`/booking/${bookingId}`);
          setBookings(prev => prev.filter(booking => booking._id !== bookingId));
          swal('Success!', 'Reservation cancelled successfully', 'success');
        } catch (error) {
          console.error('Error deleting booking:', error);
          swal('Error', 'Failed to cancel reservation', 'error');
        }
      }
    } catch (error) {
      console.error('Error in delete confirmation:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    // Format time if needed
    return timeString;
  };

  const isUpcoming = (dateString) => {
    if (!dateString) return false;
    try {
      const bookingDate = new Date(dateString);
      const now = new Date();
      return bookingDate >= now;
    } catch {
      return false;
    }
  };

  const getStatusBadge = (dateString) => {
    if (isUpcoming(dateString)) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
          <FaCheckCircle className="mr-1" />
          Upcoming
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
        <FaTimesCircle className="mr-1" />
        Past
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'corporate':
        return '🏢';
      case 'wedding':
        return '💒';
      case 'private':
        return '🍽️';
      case 'birthday':
        return '🎂';
      case 'anniversary':
        return '💝';
      default:
        return '📅';
    }
  };

  if (loading) {
    return (
      <div className="w-full p-8">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Helmet>
        <title>My Reservations | MadeBest Dashboard</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-8 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <FaCalendarAlt className="mr-3" />
              My Reservations
            </h1>
            <p className="text-orange-100">View and manage your table reservations</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{bookings.length}</p>
            <p className="text-sm text-orange-100">Total Reservations</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Reservations ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'upcoming'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming ({bookings.filter(b => isUpcoming(b.date)).length})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'past'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Past ({bookings.filter(b => !isUpcoming(b.date)).length})
          </button>
        </div>
      </div>

      {/* Reservations List */}
      <div className="p-6">
        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reservations Found</h3>
            <p className="text-gray-500 mb-6">You haven't made any reservations yet.</p>
            <a
              href="/Booking"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Make a Reservation
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking, index) => (
              <div
                key={booking._id || index}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-2 ${
                  isUpcoming(booking.date) ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{getCategoryIcon(booking.category)}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {booking.category || 'Reservation'}
                      </h3>
                      {getStatusBadge(booking.date)}
                    </div>
                  </div>
                  {isUpcoming(booking.date) && (
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Cancel Reservation"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                {/* Date and Time */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-3 text-orange-500" />
                    <div>
                      <p className="font-semibold">{formatDate(booking.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaClock className="mr-3 text-orange-500" />
                    <p className="font-semibold">{formatTime(booking.time)}</p>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaUsers className="mr-3 text-orange-500" />
                    <p className="font-semibold">{booking.guests || 'N/A'} Guests</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaEnvelope className="mr-2 text-orange-500" />
                    <span className="truncate">{booking.email || 'N/A'}</span>
                  </div>
                  {booking.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaPhone className="mr-2 text-orange-500" />
                      <span>{booking.phone}</span>
                    </div>
                  )}
                  {booking.name && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUtensils className="mr-2 text-orange-500" />
                      <span>{booking.name}</span>
                    </div>
                  )}
                </div>

                {/* Special Requests */}
                {booking.message && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Special Requests:</p>
                    <p className="text-sm text-gray-600 italic">{booking.message}</p>
                  </div>
                )}

                {/* Booking ID */}
                {booking._id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400">
                      Booking ID: <span className="font-mono">{booking._id.toString().slice(-8)}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Reservations.displayName = 'Reservations';

export default Reservations;

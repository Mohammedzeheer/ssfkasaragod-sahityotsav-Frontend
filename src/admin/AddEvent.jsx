import { useEffect, useState } from 'react';
import { MdDelete, MdEvent, MdClose, MdCheckCircle, MdError } from "react-icons/md";
import { getEvents, deleteEvent } from '../api/apiCall'; 
import UnderFooter from '../components/UnderFooter';
import EventUploader from './EventUploader'; 

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <MdCheckCircle className="w-5 h-5" />;
      case 'error':
        return <MdError className="w-5 h-5" />;
      default:
        return <MdCheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80 max-w-md transform transition-all duration-300 ease-in-out ${getToastStyles()}`}>
      {getIcon()}
      <span className="flex-1 font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <MdClose className="w-5 h-5" />
      </button>
    </div>
  );
};

function AddEvents() {
  const [events, setEvents] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toast functions
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await getEvents();
        console.log("Fetched events:", res);
        if (res) {
          setEvents(res);
          addToast('Events loaded successfully!', 'success');
        }
      } catch (err) {
        console.error("Failed to fetch events:", err.message);
        addToast('Failed to load events', 'error');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const eventToDelete = events.find(ev => ev._id === id);
    const confirmDelete = window.confirm(`Are you sure you want to delete "${eventToDelete?.title}"?`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteEvent(id);
      setEvents(prev => prev.filter(ev => ev._id !== id));
      addToast('Event deleted successfully!', 'success');
    } catch (err) {
      console.error("Delete failed:", err.message);
      addToast('Failed to delete event', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MdEvent className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Event Management</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Event Uploader would go here */}
          <EventUploader events={events} setEvents={setEvents} />
          
          {/* Events Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Your Events</h2>
              <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow">
                {events.length} {events.length === 1 ? 'Event' : 'Events'}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Loading events...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <MdEvent className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500">Create your first event to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event) => (
                  <div 
                    key={event._id} 
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
                      title="Delete Event"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>

                    {/* Event Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                          {event.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          event.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {event.description}
                      </p>

                      {/* Action Area */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            event.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                          }`}></div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            {event.status === 'active' ? 'Live Event' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bottom-0 w-full z-50">
        <UnderFooter />
      </div>
    </>
  );
}

export default AddEvents;


// import { useEffect, useState } from 'react';
// import { MdDelete } from "react-icons/md";
// import { getEvents, deleteEvent } from '../api/apiCall'; 
// import UnderFooter from '../components/UnderFooter';
// import EventUploader from './EventUploader'; 

// function AddEvents() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         const res = await getEvents();
//         console.log("Fetched events:", res);
//         if (res) {
//           setEvents(res);
//         }
//       } catch (err) {
//         console.error("Failed to fetch events:", err.message);
//       }
//     }

//     fetchEvents();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this event?");
//     if (!confirm) return;

//     try {
//       await deleteEvent(id);
//       setEvents(prev => prev.filter(ev => ev._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err.message);
//       alert("Failed to delete event ❌");
//     }
//   };

//   return (
//     <>
//       <EventUploader events={events} setEvents={setEvents} /> {/* Optional Upload/Add form */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {events.map((event, index) => (
//             <div key={event._id} className="relative border-8 border-[#ffc9a6] p-2">
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-full h-64 object-cover rounded"
//               />
//               <div className="mt-2">
//                 <h2 className="text-xl font-bold">{event.title}</h2>
//                 <p className="text-sm text-gray-600">{event.description}</p>
//                 <p className={`text-xs font-semibold mt-1 ${event.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
//                   {event.status.toUpperCase()}
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleDelete(event._id)}
//                 className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
//               >
//                 <MdDelete />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className=" bottom-0 w-full z-50">
//         <UnderFooter />
//       </div>
//     </>
//   );
// }

// export default AddEvents;

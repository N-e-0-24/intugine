'use client'
// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
// import tripData from '../../../public/frontendAssignment.json'

// // const tripData = {
// //   data: data.data
// // }

// export default function ShipmentDashboard() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedTrips, setSelectedTrips] = useState<string[]>([])
//   const [tripsPerPage, setTripsPerPage] = useState(20)

//   const calculateMetrics = () => {
//     const totalTrips = tripData.data.length
//     const delivered = tripData.data.filter(trip => trip.currenStatus === "Delivered").length
//     const delayed = tripData.data.filter(trip => trip.etaDays < 0).length
//     const inTransit = tripData.data.filter(trip => trip.currenStatus === "In Transit").length
//     const onTime = tripData.data.filter(trip => trip.etaDays >= 0).length

//     return { totalTrips, delivered, delayed, inTransit, onTime }
//   }

//   const metrics = calculateMetrics()

//   const indexOfLastTrip = currentPage * tripsPerPage
//   const indexOfFirstTrip = indexOfLastTrip - tripsPerPage
//   const currentTrips = tripData.data.slice(indexOfFirstTrip, indexOfLastTrip)

//   const totalPages = Math.ceil(tripData.data.length / tripsPerPage)

//   const handleCheckboxChange = (tripId: string) => {
//     setSelectedTrips(prev => 
//       prev.includes(tripId) ? prev.filter(id => id !== tripId) : [...prev, tripId]
//     )
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-gray-800 text-white p-4 mb-4 flex items-center">
//         <div className="bg-white text-gray-800 rounded-full p-1 mr-2">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//           </svg>
//         </div>
//         <span className="text-xl font-bold">loopipsum</span>
//       </div>

//       <h2 className="text-2xl font-bold mb-4">Shipments</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">Total trips</h3>
//           <p className="text-2xl font-bold">{metrics.totalTrips}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">Delivered</h3>
//           <p className="text-2xl font-bold">{metrics.delivered}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">Delivered</h3>
//           <div className="flex items-center">
//             <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center mr-2">
//               <span className="text-green-500 font-bold">{Math.round((metrics.onTime / metrics.totalTrips) * 100)}%</span>
//             </div>
//             <p className="text-sm">
//               Ontime<br />
//               <span className="text-green-500 font-bold">{metrics.onTime}</span>
//             </p>
//           </div>
//         </div>
//         <div className="bg-red-100 p-4 rounded shadow">
//           <h3 className="text-sm text-red-500">Delayed</h3>
//           <p className="text-2xl font-bold text-red-500">{metrics.delayed}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">In transit</h3>
//           <p className="text-2xl font-bold">
//             {metrics.inTransit} <span className="text-sm text-blue-500">{Math.round((metrics.inTransit / metrics.totalTrips) * 100)}%</span>
//           </p>
//         </div>
//       </div>

//       <div className="bg-white rounded shadow p-4 mb-4">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold">Trip list</h3>
//           <Button>Add Trip</Button>
//         </div>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]"></TableHead>
//               <TableHead>Trip id</TableHead>
//               <TableHead>Transporter</TableHead>
//               <TableHead>Source</TableHead>
//               <TableHead>Destination</TableHead>
//               <TableHead>Phone</TableHead>
//               <TableHead>ETA</TableHead>
//               <TableHead>Distance remaining</TableHead>
//               <TableHead>Trip status</TableHead>
//               <TableHead>TAT status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentTrips.map((trip) => (
//               <TableRow key={trip._id}>
//                 <TableCell>
//                   <Checkbox
//                     checked={selectedTrips.includes(trip.tripId)}
//                     onCheckedChange={() => handleCheckboxChange(trip.tripId)}
//                   />
//                 </TableCell>
//                 <TableCell>{trip.tripId}</TableCell>
//                 <TableCell>{trip.transporter}</TableCell>
//                 <TableCell>{trip.source}</TableCell>
//                 <TableCell>{trip.dest}</TableCell>
//                 <TableCell>{trip.phoneNumber}</TableCell>
//                 <TableCell>{new Date(trip.tripStartTime).toLocaleString('en-GB', { hour12: true })}</TableCell>
//                 <TableCell>{trip.distanceRemaining}</TableCell>
//                 <TableCell>
//                   <span className={`px-2 py-1 rounded ${
//                     trip.currenStatus === "Delivered" ? "bg-blue-100 text-blue-800" :
//                     trip.currenStatus === "Booked" ? "bg-gray-100 text-gray-800" :
//                     "bg-yellow-100 text-yellow-800"
//                   }`}>
//                     {trip.currenStatus}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <span className={`px-2 py-1 rounded ${
//                     trip.etaDays >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                   }`}>
//                     {trip.etaDays >= 0 ? "On time" : "Delayed"}
//                   </span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <div className="flex items-center justify-between mt-4">
//           <div className="text-sm text-gray-500">
//             Viewing {indexOfFirstTrip + 1}-{Math.min(indexOfLastTrip, tripData.data.length)} of {tripData.data.length} records
//           </div>
//           <div className="flex items-center space-x-2">
//             <Select value={tripsPerPage.toString()} onValueChange={(value) => setTripsPerPage(Number(value))}>
//               <SelectTrigger className="w-[70px]">
//                 <SelectValue placeholder="20" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="20">20</SelectItem>
//                 <SelectItem value="50">50</SelectItem>
//                 <SelectItem value="100">100</SelectItem>
//               </SelectContent>
//             </Select>
//             <div className="flex items-center space-x-1">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setCurrentPage(1)}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronsLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 const pageNumber = currentPage - 2 + i
//                 if (pageNumber > 0 && pageNumber <= totalPages) {
//                   return (
//                     <Button
//                       key={i}
//                       variant={pageNumber === currentPage ? "default" : "outline"}
//                       size="icon"
//                       onClick={() => setCurrentPage(pageNumber)}
//                     >
//                       {pageNumber}
//                     </Button>
//                   )
//                 }
//                 return null
//               })}
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setCurrentPage(totalPages)}
//                 disabled={currentPage === totalPages}
//               >
//                 <ChevronsRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
// import tripData from '../../../public/frontendAssignment.json'

// const ShipmentDashboard = () => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedTrip, setSelectedTrip] = useState<string | null>(null)  // Only one selected trip
//   const [tripsPerPage, setTripsPerPage] = useState(20)

//   // Metrics calculation function
//   const calculateMetrics = () => {
//     const totalTrips = tripData.data.length
//     const delivered = tripData.data.filter(trip => trip.currenStatus === "Delivered").length
//     const delayed = tripData.data.filter(trip => trip.etaDays < 0).length
//     const inTransit = tripData.data.filter(trip => trip.currenStatus === "In Transit").length
//     const onTime = tripData.data.filter(trip => trip.etaDays >= 0).length

//     return { totalTrips, delivered, delayed, inTransit, onTime }
//   }

//   const metrics = calculateMetrics()

//   // Pagination logic
//   const indexOfLastTrip = currentPage * tripsPerPage
//   const indexOfFirstTrip = indexOfLastTrip - tripsPerPage
//   const currentTrips = tripData.data.slice(indexOfFirstTrip, indexOfLastTrip)
//   const totalPages = Math.ceil(tripData.data.length / tripsPerPage)

//   // Handle checkbox change, only one can be selected at a time
//   const handleCheckboxChange = (tripId: string) => {
//     setSelectedTrip(prev => prev === tripId ? null : tripId)  // Toggle selection
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-gray-800 text-white p-4 mb-4 flex items-center">
//         <div className="bg-white text-gray-800 rounded-full p-1 mr-2">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//           </svg>
//         </div>
//         <span className="text-xl font-bold">loopipsum</span>
//       </div>

//       <h2 className="text-2xl font-bold mb-4">Shipments</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">Total trips</h3>
//           <p className="text-2xl font-bold">{metrics.totalTrips}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">Delivered</h3>
//           <p className="text-2xl font-bold">{metrics.delivered}</p>
//         </div>
//         <div className="bg-red-100 p-4 rounded shadow">
//           <h3 className="text-sm text-red-500">Delayed</h3>
//           <p className="text-2xl font-bold text-red-500">{metrics.delayed}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">In Transit</h3>
//           <p className="text-2xl font-bold">{metrics.inTransit}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-sm text-gray-500">On time</h3>
//           <p className="text-2xl font-bold">{metrics.onTime}</p>
//         </div>
//       </div>

//       {/* Table to display shipments */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead></TableHead>
//             <TableHead>Trip id</TableHead>
//             <TableHead>Transporter</TableHead>
//             <TableHead>Source</TableHead>
//             <TableHead>Destination</TableHead>
//             <TableHead>Phone</TableHead>
//             <TableHead>ETA</TableHead>
//             <TableHead>Distance remaining</TableHead>
//             <TableHead>Trip status</TableHead>
//             <TableHead>TAT status</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {currentTrips.map((trip) => (
//             <TableRow key={trip._id}>
//               <TableCell>
//                 <Checkbox
//                   checked={selectedTrip === trip.tripId}
//                   onCheckedChange={() => handleCheckboxChange(trip.tripId)}
//                 />
//               </TableCell>
//               <TableCell>{trip.tripId}</TableCell>
//               <TableCell>{trip.transporter}</TableCell>
//               <TableCell>{trip.source}</TableCell>
//               <TableCell>{trip.dest}</TableCell>
//               <TableCell>{trip.phoneNumber}</TableCell>
//               <TableCell>{new Date(trip.tripStartTime).toLocaleString('en-GB', { hour12: true })}</TableCell>
//               <TableCell>{trip.distanceRemaining}</TableCell>
//               <TableCell>
//                 <span className={`px-2 py-1 rounded ${trip.currenStatus === "Delivered" ? "bg-blue-100" : "bg-yellow-100"}`}>
//                   {trip.currenStatus}
//                 </span>
//               </TableCell>
//               <TableCell>
//                 <span className={`px-2 py-1 rounded ${trip.etaDays >= 0 ? "bg-green-100" : "bg-red-100"}`}>
//                   {trip.etaDays >= 0 ? "On time" : "Delayed"}
//                 </span>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Pagination and Button Controls */}
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           {/* Conditionally render the "Update Status" button */}
//           {selectedTrip && (
//             <Button className="bg-blue-500 text-white">
//               Update Status
//             </Button>
//           )}
//           <Button className="bg-green-500 text-white">
//             Add Trip
//           </Button>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Select value={tripsPerPage.toString()} onValueChange={(value) => setTripsPerPage(Number(value))}>
//             <SelectTrigger className="w-[70px]">
//               <SelectValue placeholder="20" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="20">20</SelectItem>
//               <SelectItem value="50">50</SelectItem>
//               <SelectItem value="100">100</SelectItem>
//             </SelectContent>
//           </Select>
//           <div className="flex items-center space-x-1">
//             <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
//               <ChevronsLeft className="w-4 h-4" />
//             </Button>
//             <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//               <ChevronLeft className="w-4 h-4" />
//             </Button>
//             <span className="text-sm font-medium">{currentPage} of {totalPages}</span>
//             <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//             <Button variant="outline" size="icon" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
//               <ChevronsRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ShipmentDashboard


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown } from "lucide-react"
import AddTrip from '../../../components/delivery-dashboard/addItem'
import Modal from '@/components/delivery-dashboard/modal'
import UpdateStatus from '@/components/delivery-dashboard/updateTrip'









// Circular progress bar component
const CircularProgressBar = ({ percentage, metrics }: { percentage: number, metrics: any }) => {
  const circumference = 2 * Math.PI * 40; // 40 is the radius of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className="text-blue-500 progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-500">
        {percentage}%
      </span>
      <p className="text-sm"> On Time : {metrics.onTime}</p>
    </div>
  );
};


const ShipmentDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)
  const [tripsPerPage, setTripsPerPage] = useState(20)
  const [addTrip, setAddTrip] = useState(false)
  const [updateTrip, setUpdateTrip] = useState(false)
  const [tripData, setTripData] = useState<any[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null)

  
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/trips');
        const data = await response.json();
        setTripData(data);
      } catch (error) {
        console.error("Failed to fetch trip data", error);
      }
    };
    
    fetchData();
  }, []);

  const calculateTATStatus = (trip: any) => {
    let { etaDays, tripEndTime, lastPingTime, tripStartTime } = trip;
    let timeTaken;
    tripEndTime = new Date(tripEndTime);
    tripStartTime = new Date(tripStartTime);
    lastPingTime = new Date(lastPingTime);

    if (tripEndTime) {
      timeTaken = tripEndTime - tripStartTime;
    } else {
      timeTaken = lastPingTime - tripStartTime;
    }

    const timeTakenDays = timeTaken / (1000 * 60 * 60 * 24);

    if (etaDays <= timeTakenDays) {
      return 'On time';
    } else if (etaDays > timeTakenDays) {
      return 'Delayed';
    } else {
      return 'Others';
    }
  }
  
  const calculateMetrics = () => {
    const totalTrips = tripData.length
    const delivered = tripData.filter(trip => trip.currenStatus === "Delivered").length
    const delayed = tripData.filter(trip => calculateTATStatus(trip) === "Delayed").length
    const inTransit = tripData.filter(trip => trip.currenStatus === "In Transit").length
    const onTime = tripData.filter(trip => calculateTATStatus(trip) === "On time").length

    return { totalTrips, delivered, delayed, inTransit, onTime }
  }

  const metrics = calculateMetrics()
  const deliveredPercentage = Math.round((metrics.onTime / metrics.totalTrips) * 100) || 0

  const sortedData = React.useMemo(() => {
    let sortableItems = [...tripData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'tatStatus') {
          if (calculateTATStatus(a) < calculateTATStatus(b)) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (calculateTATStatus(a) > calculateTATStatus(b)) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        } else if (sortConfig.key === 'tripStatus') {
          if (a.currenStatus < b.currenStatus) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.currenStatus > b.currenStatus) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tripData, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastTrip = currentPage * tripsPerPage
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage
  const currentTrips = sortedData.slice(indexOfFirstTrip, indexOfLastTrip)
  const totalPages = Math.ceil(sortedData.length / tripsPerPage)

  const handleCheckboxChange = (tripId: string) => {
    setSelectedTrip(prev => prev === tripId ? null : tripId)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 text-white p-4 mb-4 flex items-center">
        <div className="bg-white text-gray-800 rounded-full p-1 mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-bold">logoipsum</span>
        
      </div>

      <h2 className="text-2xl font-bold mb-4">Shipments</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Trips</h3>
    <p className="text-3xl font-bold text-blue-600">{metrics.totalTrips}</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Delivered</h3>
      <p className="text-3xl font-bold text-green-600">{metrics.delivered}</p>
    </div>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <CircularProgressBar percentage={deliveredPercentage} metrics={metrics}/>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">Delayed</h3>
    <p className="text-3xl font-bold text-red-600">{metrics.delayed}</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">In Transit</h3>
    <p className="text-3xl font-bold text-yellow-600">{metrics.inTransit}</p>
  </div>
</div>


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Trip id</TableHead>
            <TableHead>Transporter</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>Distance remaining</TableHead>
            <TableHead onClick={() => requestSort('tripStatus')} className="cursor-pointer">
              Trip status {sortConfig?.key === 'tripStatus' && (sortConfig.direction === 'ascending' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
            </TableHead>
            <TableHead onClick={() => requestSort('tatStatus')} className="cursor-pointer">
              TAT status {sortConfig?.key === 'tatStatus' && (sortConfig.direction === 'ascending' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTrips.map((trip) => (
            <TableRow key={trip._id}>
              <TableCell>
                <Checkbox
                  checked={selectedTrip === trip.tripId}
                  onCheckedChange={() => handleCheckboxChange(trip.tripId)}
                />
              </TableCell>
              <TableCell>{trip.tripId}</TableCell>
              <TableCell>{trip.transporter}</TableCell>
              <TableCell>{trip.source}</TableCell>
              <TableCell>{trip.dest}</TableCell>
              <TableCell>{trip.phoneNumber}</TableCell>
              <TableCell>{new Date(trip.tripStartTime).toLocaleString('en-GB', { hour12: true })}</TableCell>
              <TableCell>{trip.distanceRemaining}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${trip.currenStatus === "Delivered" ? "bg-blue-100" : "bg-yellow-100"}`}>
                  {trip.currenStatus}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${calculateTATStatus(trip) === "On time" ? "bg-green-100" : "bg-red-100"}`}>
                  {calculateTATStatus(trip)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          {selectedTrip && (
            <Button className="bg-blue-500 text-white" onClick={() => setUpdateTrip(true)}>
              Update Status
            </Button>
          )}
          <Button className="bg-green-500 text-white" onClick={() => setAddTrip(true)}>
            Add Trip
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={tripsPerPage.toString()} onValueChange={(value) => setTripsPerPage(Number(value))}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium">{currentPage} of {totalPages}</span>
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={addTrip} onClose={() => setAddTrip(false)}>
        <AddTrip onClose={() => setAddTrip(false)} />
      </Modal>
      <Modal isOpen={updateTrip} onClose={() => setUpdateTrip(false)}>
        <UpdateStatus 
          onClose={() => setUpdateTrip(false)} 
          tripId={selectedTrip}
        />
      </Modal>
    </div>
  )
}

export default ShipmentDashboard
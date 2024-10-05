# Next.js Delivery Dashboard Application

## Overview

This is a **Next.js** delivery dashboard application designed to manage shipments efficiently. It offers features like:

- Displaying a list of shipments with detailed information such as trip ID, transporter, source, destination, ETA, etc.
- Filtering and sorting shipments based on their status (e.g., "In Transit", "Delivered", "Delayed").
- A circular progress bar to display metrics such as delivery performance.
- Integration with **PostgreSQL** for data storage.
- **Keycloak** integration for user authentication.
- **Tailwind CSS** for styling the components.
- **Docker** for containerized deployment.

## Features
- **Main ROute** : App can be accessed at localhost:3000/delivery-dashboard

- **Sortable Columns**:Trip Status and TAT status columns are sortable can be checked by double clicking on the column
- **Add Trips**: Easily add new trips to the dashboard.
- **Update Status**: Update the status of an existing trip.
- **Pagination & Sorting**: Navigate through multiple shipments and sort based on various criteria.
- **Metrics Dashboard**: Get an overview of key shipment metrics such as on-time deliveries, delayed trips, etc.

## Tech Stack

- **Next.js** (React Framework)
- **Tailwind CSS** (Styling)
- **PostgreSQL** (Database)
- **Keycloak** (Authentication)
- **Docker** (Containerization)

## Prerequisites

- **Node.js**: Make sure you have Node.js installed (v18.x or higher).
- **Docker**: Install Docker from [here](https://www.docker.com/products/docker-desktop).

## Setup and Installation

### 1. Clone the Repository



```bash
git clone https://github.com/N-e-0-24/intugine.git
cd intugine



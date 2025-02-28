// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DeRide {
    mapping(string name => Ride ride) allRides;

    struct Coord {
        int lon;
        int lat;
    }
    struct Address {
        string street;
        string city;
        string state;
        string zip;
    }
    struct Ride {
        string guest;
        // Coord pickup;
        // Coord destination;
        Address pickup;
        // status
        // driver
    }

  function requestRide(string memory name, Address memory pickup) external {
        Ride memory ride = Ride(name, pickup);
        allRides[name] = ride;
    }

    // function requestRide(string memory name, Coord memory src, Coord memory dest) external {
    //     Ride memory ride = Ride(name, src, dest);
    //     allRides[name] = ride;
    // }

    function getRide(string memory name) external view returns (Ride memory) {
        return allRides[name];
    }

    // function getDeadline(string memory name) external view returns (uint) {
    //     return proposals[name].deadline;
    // }

}
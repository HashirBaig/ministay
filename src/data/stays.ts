export type Stay = {
  id: string; name: string; capacity: number; price: number; image: string;
  category: string; description: string; amenities: string[];
  unavailable: { start: string; end: string }[];
};
export const stays: Stay[] = [
  { id: 'forest-cabin', name: 'Forest Cabin', capacity: 4, price: 120,
    image: '/images/cabin.jpg', category: 'WOODLAND RETREAT',
    description: 'A cosy wooden cabin tucked between the trees. Slow mornings on the terrace, forest trails on your doorstep, and room for everyone to unwind.',
    amenities: ['2 bedrooms', 'Private terrace', 'Kitchen', 'Free parking'],
    unavailable: [{ start: '2026-12-24', end: '2026-12-28' }] },
  { id: 'glamping-tent', name: 'Glamping Tent', capacity: 4, price: 95,
    image: '/images/tent.jpg', category: 'A LITTLE CLOSER TO NATURE',
    description: 'All the joy of camping, with a little extra comfort. Sleep in a proper bed, share breakfast outside, and spend your evenings under the stars.',
    amenities: ['Comfortable beds', 'Outdoor seating', 'Shared facilities', 'Free parking'],
    unavailable: [{ start: '2026-12-20', end: '2027-01-04' }] },
  { id: 'lake-house', name: 'Lake House', capacity: 6, price: 175,
    image: '/images/house.jpg', category: 'LIFE BY THE WATER',
    description: 'Your own peaceful hideaway beside the lake. A spacious home for friends and family, with beautiful views and a terrace made for long summer evenings.',
    amenities: ['3 bedrooms', 'Lake views', 'Full kitchen', 'Private terrace'],
    unavailable: [{ start: '2026-12-30', end: '2027-01-03' }] },
];
export function availableStays(checkIn: string, checkOut: string, guests: number) {
  return stays.filter(stay => stay.capacity >= guests && !stay.unavailable.some(
    range => checkIn < range.end && checkOut > range.start,
  ));
}

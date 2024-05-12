// export interface Doctor {
//   id: number;
//   name: string;
//   specifity: number;
//   rating: number;
//   gps?: {
//     latitude: number;
//     longitude: number;
//   };
//   imgUrl: string;
//   phone: string;
//   address: string;
// }

export const getMapPrepareData = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          id: 1566791568,
          name: 'Ocean Voyager',
          register_number: 'ĐNa - 111112 - TS',
          gross_tonnage: '0.582',
          owner_id: 74573785,
          updated_at: '2024-03-25 02:38:50.844382+00',
          ship_status: 'Sailing',
          ship_type: 'string',
          position: [16.085, 108.25],
          length: '17',
          full_name: 'Pham Van Huy',
          phone_number: '+123122133',
          img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 936545066,
          name: 'Starlight Explorer',
          register_number: 'ĐNa - 111112 - TS',
          gross_tonnage: '0.582',
          owner_id: 74573785,
          updated_at: '2024-03-25 02:38:50.844382+00',
          ship_status: 'Sailing',
          ship_type: 'string',
          position: [16.03, 109.3],
          length: '17',
          full_name: 'Pham Van Huy',
          phone_number: '+123122133',
          img: 'https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 68332850,
          name: 'Mystic Mariner',
          register_number: 'ĐNa - 111112 - TS',
          gross_tonnage: '0.582',
          owner_id: 3454664029,
          updated_at: '2024-03-25 02:38:50.844382+00',
          ship_status: 'Sailing',
          ship_type: 'string',
          position: [13.03, 111.3],
          length: '17',
          full_name: 'Tran Van Nhan',
          phone_number: '+123122133',
          img: 'https://images.unsplash.com/photo-1589420241438-38271f7d3cea?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 2866305469,
          name: 'Sea Queen',
          register_number: 'ĐNa - 111112 - TS',
          gross_tonnage: '0.582',
          owner_id: 74573785,
          updated_at: '2024-03-25 02:38:50.844382+00',
          ship_status: 'Docked',
          ship_type: 'string',
          position: [8.1789, 105.0139],
          length: '17',
          full_name: 'Pham Van Huy',
          phone_number: '+123122133',
          img: 'https://plus.unsplash.com/premium_photo-1663011524822-e32fc07f7105?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 1176285647,
          name: 'Wave Runner',
          register_number: 'ĐNa - 111112 - TS',
          gross_tonnage: '0.582',
          owner_id: 74573785,
          updated_at: '2024-03-25 02:38:50.844382+00',
          ship_status: 'Sailing',
          ship_type: 'string',
          position: [16.03, 108.5],
          length: '17',
          full_name: 'Pham Van Huy',
          phone_number: '+123122133',
          img: 'https://plus.unsplash.com/premium_photo-1663040158145-54aaca9c0d3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ]);
    }, 0);
  });
};

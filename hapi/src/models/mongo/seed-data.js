export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa",
      userType: "normal",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK",
      userType: "admin",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO",
      userType: "normal",
    },
  },
  categories: {
    _model: "Category",
    fields: {
      title: "Local Field Names",
      img: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png",
      userID: "->users.homer",
    },
    bridges: {
      title: "Bridges",
      img: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png",
      userID: "->users.homer",
    },
    beaches: {
      title: "beaches",
      img: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png",
      userID: "->users.marge",
    },
  },
  pois: {
    _model: "POI",
    field01: {
      name: "Field 01",
      description: "Long Meadow",
      latitude: 52.369626,
      longitude:  -6.691952,
      image: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png",
      categoryID: "->categories.fields",
    },
    field02: {
      name: "Field 02",
      description: "Kiln Field",
      latitude: 52.371033,
      longitude:  -6.692752,
      image: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1679137014/quph4xe5n3krxozhmzrq.jpg",
      categoryID: "->categories.fields",
    },
    field03: {
      name: "Field 03",
      description: "Dalton's field",
      latitude: 52.372967,
      longitude:  -6.693630,
      image: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1679136599/zokeyrangv6imyxtbiat.jpg",
      categoryID: "->categories.fields",
    },
    bridge01: {
      name: "Bridge 01",
      description: "Carrowreigh Lane Bridge",
      latitude: 52.354875,
      longitude:  -6.691832,
      image: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png",
      categoryID: "->categories.bridges",
    },
    bridge02: {
      name: "Bridge 02",
      description: "Roche's Bridge",
      latitude: 52.365415,
      longitude:  -6.815584,
      image: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png",
      categoryID: "->categories.bridges",
    },
    beach01: {
      name: "Bannow Strand",
      description: "Lovely strand Beware the tide",
      latitude: 52.211633010363705,
      longitude:   -6.797021244068255,
      image: "https://res.cloudinary.com/dwv4wuj9l/image/upload/v1679137014/quph4xe5n3krxozhmzrq.jpg",
      categoryID: "->categories.beaches",
    },
    beach02: {
      name: "Curracloe",
      description: " Lovely ",
      latitude: 52.38844073763779,
      longitude:   -6.3623175512270445,
      image: "https://res.cloudinary.com/dwv4wuj9l/image/upload/v1679136916/hsxu4h3jyf7rqogj4o5t.jpg",
      categoryID: "->categories.beaches",
    },
  },
  gallerys:{
    _model: "Gallery",
    gallery01:{
      img: "http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png",
      poiID: "->pois.beach01" 
    },
    gallery02:{
      img: "https://res.cloudinary.com/dwv4wuj9l/image/upload/v1679136916/hsxu4h3jyf7rqogj4o5t.jpg",
      poiID: "->pois.beach01" 
    },
    gallery03:{
      img: "https://res.cloudinary.com/dwv4wuj9l/image/upload/v1679137014/quph4xe5n3krxozhmzrq.jpg",
      poiID: "->pois.beach01" 
    },
  },
};

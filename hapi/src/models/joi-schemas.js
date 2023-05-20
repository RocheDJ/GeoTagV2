import Joi from "joi";

export const schUserType = Joi.object().keys({
    type: Joi.string().valid("normal", "admin", "group", "suspended"),
});

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserTypeSpec = Joi.alternatives().try(Joi.string(), schUserType).description("a valid User Group"); // can be a string or a user type object
// ################ User Spec #############################
export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required().min(5),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required().regex(/^[A-Z][a-z]{2,}$/),
    lastName: Joi.string().example("Simpson").required().regex(/^[A-Z][a-z]{2,}$/),
    userType: UserTypeSpec,
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");


// ################ Place of interest Spec #############################
export const PoiSpec = Joi.object()
    .keys({
        name: Joi.string().example("Somewhere beach").required().regex(/^[A-Za-z0-9 -]*$/), // accept letters and numbers dash and space
        description: Joi.string().example("Description of Somewhere beach").optional().regex(/^[A-Za-z0-9 -]*$/),
        latitude: Joi.number().required().max(360).min(-360),
        longitude: Joi.number().required().max(360).min(-360),
        image: Joi.any().optional(),
        categoryID: IdSpec,
    })
    .label("POI");

export const PoiSpecPlus = PoiSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("PoiPlus");

export const PoiArraySpec = Joi.array().items(PoiSpecPlus).label("PoiArray");

// ################ Category Spec         #############################

export const simpleCategorySpec = Joi.object()
    .keys({
        title: Joi.string().required().example("Beaches").regex(/^[A-Za-z0-9 -]*$/),
        img: Joi.string().example("http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png"),
        userID: IdSpec,
    })
    .label("NewCategory");
export const CategorySpec = Joi.object()
    .keys({
        title: Joi.string().required().example("Beaches").regex(/^[A-Za-z0-9 -]*$/),
        img: Joi.string().example("http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png"),
        poi: PoiArraySpec,
        userID: IdSpec,
    })
    .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
})
    .label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const simpleCategorySpecPlus = simpleCategorySpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
})
    .label("simpleCategoryPlus");
export const simpleCategoryArraySpec = Joi.array().items(simpleCategorySpecPlus).label("simpleCategoryArray");

export const JwtAuth = Joi.object()
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
        _id : IdSpec,
    })
    .label("JwtAuth");

// ################################## Climate Spec ##############################################
export const climateReadingSpec = Joi.object()
    .keys({
        code: Joi.number().required(),
        temperature: Joi.number().required(),
        pressure: Joi.number().required(),
        windSpeed: Joi.number().required(),
        windDirection: Joi.any().optional(),
    })
    .label("climateReading");

// ################################## Gallery Spec ##############################################
export const gallerySpec = Joi.object()
    .keys({
        img: Joi.string().example("http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png"),
        poiID: IdSpec,
    })
    .label("NewGallery");

export const gallerySpecPlus = gallerySpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
})
    .label("CategoryPlus");
export const galleryArraySpec = Joi.array().items(gallerySpecPlus).label("GalleryArray");
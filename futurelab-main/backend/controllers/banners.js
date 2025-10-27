const Banner = require('../models/Banner');
const asyncHandler = require('../middleware/async');

// Mock data for when database is not available
const mockBanners = [
    {
        _id: '1',
        title: 'Special Summer Offer',
        description: 'Get 50% off on all health checkups',
        imageUrl: '/images/banners/summer-offer.png',
        bannerType: 'main',
        isActive: true,
        displayOrder: 1,
        linkUrl: '/checkups'
    },
    {
        _id: '2',
        title: 'Free Home Sample Collection',
        description: 'For all bookings above ₹1999',
        imageUrl: '/images/banners/free-collection.png',
        bannerType: 'bottom',
        isActive: true,
        displayOrder: 1,
        linkUrl: '/checkups'
    },
    {
        _id: '3',
        title: 'Women Health Package',
        description: 'Special packages for women health',
        imageUrl: '/images/banners/women-health.png',
        bannerType: 'bottom',
        isActive: true,
        displayOrder: 2,
        linkUrl: '/women-care'
    },
    {
        _id: '4',
        title: 'Men Health Package',
        description: 'Comprehensive health checkups for men',
        imageUrl: '/images/banners/men-health.png',
        bannerType: 'bottom',
        isActive: true,
        displayOrder: 3,
        linkUrl: '/men-care'
    }
];

// Utility function to check if database is connected
const isDatabaseConnected = () => {
    return Banner.db.readyState === 1; // 1 means connected
};

// @desc    Get all banners
// @route   GET /api/v1/banners
// @access  Public
exports.getBanners = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(200).json({
            success: true,
            count: mockBanners.length,
            data: mockBanners
        });
    }
    res.status(200).json(res.advancedResults);
});

// @desc    Get main banners
// @route   GET /api/v1/banners/main
// @access  Public
exports.getMainBanners = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredBanners = mockBanners.filter(banner => banner.bannerType === 'main' && banner.isActive);
        return res.status(200).json({
            success: true,
            count: filteredBanners.length,
            data: filteredBanners
        });
    }

    const banners = await Banner.find({
        bannerType: 'main',
        isActive: true
    }).sort({ displayOrder: 1 });

    res.status(200).json({
        success: true,
        count: banners.length,
        data: banners
    });
});

// @desc    Get bottom banners
// @route   GET /api/v1/banners/bottom
// @access  Public
exports.getBottomBanners = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredBanners = mockBanners.filter(banner => banner.bannerType === 'bottom' && banner.isActive);
        return res.status(200).json({
            success: true,
            count: filteredBanners.length,
            data: filteredBanners
        });
    }

    const banners = await Banner.find({
        bannerType: 'bottom',
        isActive: true
    }).sort({ displayOrder: 1 });

    res.status(200).json({
        success: true,
        count: banners.length,
        data: banners
    });
});

// @desc    Get random bottom banner
// @route   GET /api/v1/banners/bottom/random
// @access  Public
exports.getRandomBottomBanner = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredBanners = mockBanners.filter(banner => banner.bannerType === 'bottom' && banner.isActive);
        if (filteredBanners.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No banners found'
            });
        }
        // Get random banner
        const randomIndex = Math.floor(Math.random() * filteredBanners.length);
        const randomBanner = filteredBanners[randomIndex];
        return res.status(200).json({
            success: true,
            data: randomBanner
        });
    }

    const banners = await Banner.find({
        bannerType: 'bottom',
        isActive: true
    });

    if (banners.length === 0) {
        return res.status(404).json({
            success: false,
            error: 'No banners found'
        });
    }

    // Get random banner
    const randomIndex = Math.floor(Math.random() * banners.length);
    const randomBanner = banners[randomIndex];

    res.status(200).json({
        success: true,
        data: randomBanner
    });
});

// @desc    Get single banner
// @route   GET /api/v1/banners/:id
// @access  Public
exports.getBanner = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const banner = mockBanners.find(banner => banner._id === req.params.id);
        if (!banner) {
            return res.status(404).json({
                success: false,
                error: `Banner not found with id of ${req.params.id}`
            });
        }
        return res.status(200).json({
            success: true,
            data: banner
        });
    }

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
        return res.status(404).json({
            success: false,
            error: `Banner not found with id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: banner
    });
});

// @desc    Create new banner
// @route   POST /api/v1/banners
// @access  Private/Admin
exports.createBanner = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(503).json({
            success: false,
            error: 'Database not available. Cannot create banner.'
        });
    }

    const banner = await Banner.create(req.body);

    res.status(201).json({
        success: true,
        data: banner
    });
});

// @desc    Update banner
// @route   PUT /api/v1/banners/:id
// @access  Private/Admin
exports.updateBanner = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(503).json({
            success: false,
            error: 'Database not available. Cannot update banner.'
        });
    }

    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!banner) {
        return res.status(404).json({
            success: false,
            error: `Banner not found with id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: banner
    });
});

// @desc    Delete banner
// @route   DELETE /api/v1/banners/:id
// @access  Private/Admin
exports.deleteBanner = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(503).json({
            success: false,
            error: 'Database not available. Cannot delete banner.'
        });
    }

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
        return res.status(404).json({
            success: false,
            error: `Banner not found with id of ${req.params.id}`
        });
    }

    await banner.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});
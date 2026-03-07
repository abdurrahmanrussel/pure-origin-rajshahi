// GP, Skitto & Ryze Packages
// These packages don't change frequently, so kept in a separate file

// ===== IMAGE IMPORTS =====
import gpImage from '../assets/grameenphone.jpg'
import skittoImage from '../assets/skitto.png'
import ryzeImage from '../assets/ryze.webp'

// ===== OPERATOR CONFIGURATIONS =====
const operators = {
  gp: {
    name: 'Grameenphone',
    image: gpImage,
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    commonFeatures: ['30 Days Validity', 'Grameenphone Network']
  },
  skitto: {
    name: 'Skitto',
    image: skittoImage,
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    commonFeatures: ['30 Days Validity', 'Skitto Network']
  },
  ryze: {
    name: 'Ryze',
    image: ryzeImage,
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    commonFeatures: ['30 Days Validity', 'Ryze Network']
  }
}

// ===== PACKAGE DEFINITIONS =====
const packages = [
  // ===== GRAMEENPHONE PACKAGES =====
  { name: 'GP 400 GB', type: 'gp', price: 860, description: '৪০০ জিবি = ৮৬০ঁটাকা', features: ['400GB Data'] },
  { name: 'GP 300 Min', type: 'gp', price: 260, description: '৩০০ মিনিট = ২৬০ঁটাকা', features: ['300 Minutes'] },
  { name: 'GP 640 Min', type: 'gp', price: 410, description: '৬৪০ মিনিট = ৪১০ঁটাকা', features: ['640 Minutes'] },
  { name: 'GP 820 Min', type: 'gp', price: 500, description: '৮২০ মিনিট = ৫০০ঁটাকা', features: ['820 Minutes'] },
  { name: 'GP 150 GB', type: 'gp', price: 770, description: '১৫০ জিবি = ৭৭০ঁটাকা', features: ['150GB Data'] },
  { name: 'GP 70 GB', type: 'gp', price: 680, description: '৭০ জিবি = ৬৮০ঁটাকা', features: ['70GB Data'] },

  // ===== SKITTO PACKAGES =====
  { name: 'Skitto 75GB + 300 Min', type: 'skitto', price: 720, description: '৭৫+৩০০ = ৭২০ঁটাকা', features: ['75GB Data', '300 Minutes'] },
  { name: 'Skitto 75GB + 200 Min', type: 'skitto', price: 700, description: '৭৫+২০০ = ৭০০ঁটাকা', features: ['75GB Data', '200 Minutes'] },
  { name: 'Skitto 50GB + 300 Min', type: 'skitto', price: 625, description: '৫০+৩০০ = ৬২৫ঁটাকা', features: ['50GB Data', '300 Minutes'] },
  { name: 'Skitto 50GB + 200 Min', type: 'skitto', price: 600, description: '৫০+২০০ = ৬০০ঁটাকা', features: ['50GB Data', '200 Minutes'] },
  { name: 'Skitto 100 GB', type: 'skitto', price: 740, description: '১০০ জিবি = ৭৪০ঁটাকা', features: ['100GB Data'] },
  { name: 'Skitto 75 GB', type: 'skitto', price: 670, description: '৭৫ জিবি = ৬৭০ঁটাকা', features: ['75GB Data'] },
  { name: 'Skitto 50 GB', type: 'skitto', price: 545, description: '৫০ জিবি = ৫৪৫ঁটাকা', features: ['50GB Data'] },

  // ===== RYZE PACKAGES =====
  { name: 'Ryze 25GB + 150 Min', type: 'ryze', price: 330, description: '২৫+১৫০ = ৩৩০ঁটাকা', features: ['25GB Data', '150 Minutes'] },
  { name: 'Ryze 50GB + 300 Min', type: 'ryze', price: 540, description: '৫০+৩০০ = ৫৪০ঁটাকা', features: ['50GB Data', '300 Minutes'] },
  { name: 'Ryze 60GB + 500 Min', type: 'ryze', price: 640, description: '৬০+৫০০ = ৬৪০ঁটাকা', features: ['60GB Data', '500 Minutes'] }
]

// ===== HELPER FUNCTIONS =====
export const getAllTelecomPackages = () => {
  let index = 0
  return packages.map(pkg => {
    const operator = operators[pkg.type]
    index++
    return {
      id: `telecom-${pkg.type}-${index}`,
      name: pkg.name,
      type: pkg.type,
      carrier: operator.name,
      price: pkg.price,
      description: `🔥 ${pkg.description}\n\nসব অফারের মেয়াদ ৩০ দিন`,
      thumbnail: operator.image,
      image: operator.image,
      youtube: operator.youtube,
      gallery: [],
      features: [...pkg.features, ...operator.commonFeatures]
    }
  })
}

export const getTelecomPackagesByType = (type) => {
  return getAllTelecomPackages().filter(product => product.type === type)
}

export const getTelecomPackageById = (id) => {
  return getAllTelecomPackages().find(product => product.id === id)
}

// Export the processed packages directly
export const telecomPackages = getAllTelecomPackages()
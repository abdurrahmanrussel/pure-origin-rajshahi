// Mobile Package Products - Optimized and Simplified
// Last updated: 05/03/2026

// ===== IMAGE IMPORTS =====
import robiImage from '../assets/Robi.jpeg'
import airtelImage from '../assets/Airtel.png'
import banglalinkImage from '../assets/banglalink.jpg'

// ===== OPERATOR CONFIGURATIONS =====
const operators = {
  robi: {
    name: 'Robi',
    image: robiImage,
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    commonFeatures: ['30 Days Validity', 'Robi Network']
  },
  airtel: {
    name: 'Airtel',
    image: airtelImage,
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    commonFeatures: ['30 Days Validity', 'Airtel Network']
  },
  banglalink: {
    name: 'Banglalink',
    image: banglalinkImage,
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    commonFeatures: ['30 Days Validity', 'Banglalink Network']
  }
}

// ===== PACKAGE DEFINITIONS =====
const packages = [
  // ===== ROBI PACKAGES =====
  { name: 'Robi 60GB + 1500 Min', type: 'robi', price: 925, description: '৬০/৭০+১৫০০ = ৯২৫ঁচেক', features: ['60GB Data', '1500 Minutes'] },
  { name: 'Robi Unlimited + 1900 Min', type: 'robi', price: 1100, description: 'Unlimit+১৯০০মিনিট = ১১০০ঁ', features: ['Unlimited Data', '1900 Minutes'] },
  { name: 'Robi 50GB + 700 Min', type: 'robi', price: 750, description: '৫০/৪৫+৭০০ = ৭৫০ঁচেক', features: ['50GB Data', '700 Minutes'] },
  { name: 'Robi 30GB + 600 Min', type: 'robi', price: 685, description: '৩০+৬০০ = ৬৮৫ঁচেক', features: ['30GB Data', '600 Minutes'] },
  { name: 'Robi 100GB + 1000 Min', type: 'robi', price: 925, description: '১০০+১০০০ = ৯২৫ঁগিফট', features: ['100GB Data', '1000 Minutes'] },
  { name: 'Robi 75GB + 1000 Min', type: 'robi', price: 870, description: '৭৫+১০০০ = ৮৭০ঁগিফট', features: ['75GB Data', '1000 Minutes'] },
  { name: 'Robi 75GB + 500 Min', type: 'robi', price: 795, description: '৭৫+৫০০ = ৭৯৫ঁগিফট', features: ['75GB Data', '500 Minutes'] },
  { name: 'Robi 50GB + 1000 Min', type: 'robi', price: 785, description: '৫০+১০০০ = ৭৮৫ঁগিফট', features: ['50GB Data', '1000 Minutes'] },
  { name: 'Robi 50GB + 750 Min', type: 'robi', price: 765, description: '৫০+৭৫০ = ৭৬৫ঁগিফট', features: ['50GB Data', '750 Minutes'] },
  { name: 'Robi 50GB + 500 Min', type: 'robi', price: 725, description: '৫০+৫০০ = ৭২৫ঁগিফট', features: ['50GB Data', '500 Minutes'] },
  { name: 'Robi 40GB + 750 Min', type: 'robi', price: 755, description: '৪০+৭৫০ = ৭৫৫ঁগিফট', features: ['40GB Data', '750 Minutes'] },
  { name: 'Robi 150/200 GB', type: 'robi', price: 750, description: '১৫০/২০০ জিবি = ৭৫০ঁঅল', features: ['150-200GB Data'] },
  { name: 'Robi 80 GB', type: 'robi', price: 690, description: '৮০ জিবি = ৬৯০ঁচেক', features: ['80GB Data'] },
  { name: 'Robi 70 GB', type: 'robi', price: 685, description: '৭০ জিবি = ৬৮৫ঁঅল', features: ['70GB Data'] },
  { name: 'Robi 60 GB', type: 'robi', price: 620, description: '৬০ জিবি = ৬২০ঁচেক', features: ['60GB Data'] },

  // ===== AIRTEL PACKAGES =====
  { name: 'Airtel 75GB + 1500 Min', type: 'airtel', price: 925, description: '৭৫+১৫০০ = ৯২৫ঁঅল', features: ['75GB Data', '1500 Minutes'] },
  { name: 'Airtel Unlimited + 1000 Min', type: 'airtel', price: 885, description: 'Unlimit+১০০০মিনিট = ৮৮৫ঁ', features: ['Unlimited Data', '1000 Minutes'] },
  { name: 'Airtel 60GB + 600 Min', type: 'airtel', price: 665, description: '৬০+৬০০ = ৬৬৫ঁঅল', features: ['60GB Data', '600 Minutes'] },
  { name: 'Airtel 50GB + 500 Min', type: 'airtel', price: 585, description: '৫০+৫০০ = ৫৮৫ঁচেক', features: ['50GB Data', '500 Minutes'] },
  { name: 'Airtel 35/40GB + 400 Min', type: 'airtel', price: 525, description: '৩৫/৪০+৪০০ = ৫২৫ঁচেক', features: ['35-40GB Data', '400 Minutes'] },
  { name: 'Airtel 100GB + 1000 Min', type: 'airtel', price: 795, description: '১০০+১০০০ = ৭৯৫ঁগিফট', features: ['100GB Data', '1000 Minutes'] },
  { name: 'Airtel 80GB + 500 Min', type: 'airtel', price: 680, description: '৮০+৫০০ = ৬৮০ঁগিফট', features: ['80GB Data', '500 Minutes'] },
  { name: 'Airtel 80GB + 100 Min', type: 'airtel', price: 645, description: '৮০+১০০ = ৬৪৫ঁগিফট', features: ['80GB Data', '100 Minutes'] },
  { name: 'Airtel 60GB + 500 Min', type: 'airtel', price: 630, description: '৬০+৫০০ = ৬৩০ঁগিফট', features: ['60GB Data', '500 Minutes'] },
  { name: 'Airtel 40GB + 800 Min', type: 'airtel', price: 635, description: '৪০+৮০০ = ৬৩৫ঁগিফট', features: ['40GB Data', '800 Minutes'] },
  { name: 'Airtel 20GB + 700 Min', type: 'airtel', price: 600, description: '২০+৭০০ = ৬০০ঁগিফট', features: ['20GB Data', '700 Minutes'] },
  { name: 'Airtel 20GB + 500 Min', type: 'airtel', price: 520, description: '২০+৫০০ = ৫২০ঁগিফট', features: ['20GB Data', '500 Minutes'] },
  { name: 'Airtel 30GB + 300 Min', type: 'airtel', price: 450, description: '৩০+৩০০ = ৪৫০ঁগিফট', features: ['30GB Data', '300 Minutes'] },
  { name: 'Airtel 20GB + 300 Min', type: 'airtel', price: 400, description: '২০+৩০০ = ৪০০ঁগিফট', features: ['20GB Data', '300 Minutes'] },
  { name: 'Airtel 100 GB', type: 'airtel', price: 665, description: '১০০ জিবি = ৬৬৫ঁচেক', features: ['100GB Data'] },
  { name: 'Airtel 75 GB', type: 'airtel', price: 605, description: '৭৫ জিবি = ৬০৫ঁচেক', features: ['75GB Data'] },
  { name: 'Airtel 45/50 GB', type: 'airtel', price: 520, description: '৪৫/৫০ জিবি = ৫২০ঁচেক', features: ['45-50GB Data'] },

  // ===== BANGLALINK PACKAGES =====
  { name: 'Banglalink 150GB + 1800 Min', type: 'banglalink', price: 1070, description: '১৫০+১৮০০ = ১০৭০ঁঅল', features: ['150GB Data', '1800 Minutes'] },
  { name: 'Banglalink 80GB + 1600 Min', type: 'banglalink', price: 975, description: '৮০+১৬০০ = ৯৭৫ঁঅল', features: ['80GB Data', '1600 Minutes'] },
  { name: 'Banglalink 50GB + 1500 Min', type: 'banglalink', price: 865, description: '৫০+১৫০০ = ৮৬৫ঁঅল', features: ['50GB Data', '1500 Minutes'] },
  { name: 'Banglalink 50GB + 1000 Min', type: 'banglalink', price: 790, description: '৫০+১০০০ = ৭৯০ঁঅল', features: ['50GB Data', '1000 Minutes'] },
  { name: 'Banglalink 40GB + 700 Min', type: 'banglalink', price: 735, description: '৪০+৭০০ = ৭৩৫ঁঅল', features: ['40GB Data', '700 Minutes'] },
  { name: 'Banglalink 40GB + 500 Min', type: 'banglalink', price: 600, description: '৪০+৫০০ = ৬০০ঁঅল', features: ['40GB Data', '500 Minutes'] },
  { name: 'Banglalink 30GB + 400 Min', type: 'banglalink', price: 555, description: '৩০+৪০০ = ৫৫৫ঁঅল', features: ['30GB Data', '400 Minutes'] },
  { name: 'Banglalink 150 GB', type: 'banglalink', price: 870, description: '১৫০ জিবি = ৮৭০ঁঅল', features: ['150GB Data'] },
  { name: 'Banglalink 100 GB', type: 'banglalink', price: 770, description: '১০০ জিবি = ৭৭০ঁঅল', features: ['100GB Data'] },
  { name: 'Banglalink 85 GB', type: 'banglalink', price: 720, description: '৮৫ জিবি = ৭২০ঁঅল', features: ['85GB Data'] },
  { name: 'Banglalink 60 GB', type: 'banglalink', price: 640, description: '৬০ জিবি = ৬৪০ঁঅল', features: ['60GB Data'] },
  { name: 'Banglalink 40 GB', type: 'banglalink', price: 555, description: '৪০ জিবি = ৫৫৫ঁঅল', features: ['40GB Data'] },
  { name: 'Banglalink 1000 Min', type: 'banglalink', price: 590, description: '১০০০ মিনিট = ৫৯০ঁঅল', features: ['1000 Minutes'] },
  { name: 'Banglalink 825 Min', type: 'banglalink', price: 490, description: '৮২৫ মিনিট = ৪৯০ঁঅল', features: ['825 Minutes'] },
  { name: 'Banglalink 650 Min', type: 'banglalink', price: 405, description: '৬৫০ মিনিট = ৪০৫ঁঅল', features: ['650 Minutes'] },
  { name: 'Banglalink 450 Min', type: 'banglalink', price: 325, description: '৪৫০ মিনিট = ৩২৫ঁঅল', features: ['450 Minutes'] },
  { name: 'Banglalink 300 Min', type: 'banglalink', price: 285, description: '৩০০ মিনিট = ২৮৫ঁঅল', features: ['300 Minutes'] },
  { name: 'Banglalink 250 Min', type: 'banglalink', price: 235, description: '২৫০ মিনিট = ২৩৫ঁঅল', features: ['250 Minutes'] }
]

// ===== HELPER FUNCTIONS =====
export const getAllProducts = () => {
  let index = 0
  return packages.map(pkg => {
    const operator = operators[pkg.type]
    index++
    return {
      id: `${pkg.type}-${index}`,
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

export const getProductsByType = (type) => {
  return getAllProducts().filter(product => product.type === type)
}

export const getProductById = (id) => {
  return getAllProducts().find(product => product.id === id)
}

// Export the processed products directly
export const products = getAllProducts()
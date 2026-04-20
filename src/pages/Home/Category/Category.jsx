import React from 'react'
import UseText from '../../../Component/HeadingText/UseText'

const categories = [
  {
    name: 'Gourmet Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
    description: 'Juicy, flame-grilled beef with artisan buns and fresh toppings.',
    count: '12 Items'
  },
  {
    name: 'Artisan Pasta',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500&auto=format&fit=crop',
    description: 'Freshly made pasta with authentic Italian sauces and spices.',
    count: '8 Items'
  },
  {
    name: 'Wood-Fired Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop',
    description: 'Crispy, thin-crust pizza baked to perfection in our brick oven.',
    count: '15 Items'
  },
  {
    name: 'Crispy Chicken',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=500&auto=format&fit=crop',
    description: 'Tender, golden-brown chicken served with signature dips.',
    count: '10 Items'
  }
];

function Category() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <UseText 
          heading="Discover Our Menu" 
          subheading="Freshly Prepared Daily" 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 block">
                  {cat.count}
                </span>
                <h3 className="text-2xl font-black mb-2 leading-tight">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {cat.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <span className="text-sm font-bold">View Category</span>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Category
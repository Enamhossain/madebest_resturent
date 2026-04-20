import React from 'react'

function UseText({heading, subheading}) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16 px-4">
      <div className="flex items-center gap-4 w-full max-w-lg">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/50" />
        <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary whitespace-nowrap">
          {subheading}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/50" />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
        {heading.split(' ').map((word, i) => (
          <span key={i} className={i === heading.split(' ').length - 1 ? 'text-primary' : ''}>
            {word}{' '}
          </span>
        ))}
      </h2>
      
      <div className="w-24 h-1.5 bg-primary rounded-full" />
    </div>
  )
}

export default UseText
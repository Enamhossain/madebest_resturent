import React from 'react'

function SectionCover({img,title}) {
  return (
<Parallax
    blur={{ min: -50, max: 50 }}
    bgImage={img}
    bgImageAlt="the menu"
    strength={-200}
>
    <div className="h-[700px] flex items-center justify-center bg-black bg-opacity-60">
        <div className="text-center text-neutral-content">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                <p className="mb-5 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
        </div>
    </div>
</Parallax>

  )
}

export default SectionCover
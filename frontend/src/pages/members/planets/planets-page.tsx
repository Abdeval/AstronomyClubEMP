import CustomHeader from '@/components/images/custom-header'
import ImageCard from '@/components/images/image-card'
import { planetsImages } from '@/lib/data'
import { ImageType } from '@/lib/types'


export default function PlanetsPage() {
  return (
    <div className='space-y-8'>
      <CustomHeader  image='/images/categories/planets.jpg' title='planets' icon='EarthIcon'/>
      {/* render the list of the planets */}
      <div className='flex items-center flex-wrap gap-2 pt-4'>
        {
          planetsImages.map((planet: Partial<ImageType> , index:number) => (
            <ImageCard title={planet.title as string} image={planet.image as string} id={index} key={index}/>
          ))
        }
      </div>
    </div>
  )
}

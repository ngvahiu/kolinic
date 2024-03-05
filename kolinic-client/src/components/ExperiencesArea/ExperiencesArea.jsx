import { Progress } from "antd"
import Heading from "../../ui/Heading/Heading"

function ExperiencesArea() {
    return (
        <div className='mt-[4rem] grid grid-cols-1 md:grid-cols-2'>
            <div className='grid grid-cols-2 md:pr-[5rem] gap-[1rem] md:gap-[2rem]'>
                <div className='rounded-xl overflow-hidden'>
                    <img
                        className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-xl"
                        src='https://template.viserlab.com/kolinic/kolinic/assets/img/about/experience1.jpg'
                        alt='#'
                    />
                </div>
                <div className='rounded-xl overflow-hidden'>
                    <img
                        className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-xl"
                        src='https://template.viserlab.com/kolinic/kolinic/assets/img/about/experience1.jpg'
                        alt='#'
                    />
                </div>
                <div className='rounded-xl overflow-hidden'>
                    <img
                        className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-xl"
                        src='https://template.viserlab.com/kolinic/kolinic/assets/img/about/experience1.jpg'
                        alt='#'
                    />
                </div>
                <div className='rounded-xl overflow-hidden'>
                    <img
                        className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-xl"
                        src='https://template.viserlab.com/kolinic/kolinic/assets/img/about/experience1.jpg'
                        alt='#'
                    />
                </div>
            </div>
            <div>
                <Heading
                    title='30 Years More Services Experiences'
                    description='Ridiculus elit amet sagittis arcu cras ornare, amet a amet urna vicras. Ipsum sociosqu. Mi consequat nec, per urna sed vitae mi lectusn egestas, in consectetuer sed. Nunc id venenatis'
                    textAlign="left"
                    bottomBar={true}
                />
                <div className="space-y-8">
                    <div>
                        <h1 className="text-black text-[1.5rem] md:text-[2rem] font-bold">Heart Surgery</h1>
                        <Progress strokeWidth={10} percent={75} status="active" />
                    </div>
                    <div>
                        <h1 className="text-black text-[1.5rem] md:text-[2rem] font-bold">Laborate Analysis</h1>
                        <Progress strokeWidth={10} percent={85} status="active" />
                    </div>
                    <div>
                        <h1 className="text-black text-[1.5rem] md:text-[2rem] font-bold">Customer Support</h1>
                        <Progress strokeWidth={10} percent={65} status="active" />
                    </div>
                    <div>
                        <h1 className="text-black text-[1.5rem] md:text-[2rem] font-bold">Medical Research</h1>
                        <Progress strokeWidth={10} percent={95} status="active" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperiencesArea
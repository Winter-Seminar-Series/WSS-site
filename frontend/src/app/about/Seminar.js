import Rectangle from '../../public/source/Rectangle.png';
import Frame from '../../public/source/Frame.svg';
import mobile from '../../public/source/mobile.png';
import calendar from '../../public/source/Calendar.svg';

export default function Seminar() {
  return (
    <main>
        <div className="flex w-[1199px] flex-col justify-center items-start gap-8 shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)] my-13 mx-auto px-auto py-auto bg-white rounded-2xl">
            {/* <div className='flex w-[901px] flex-col justify-center items-start gap-10 shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)] px-14 py-[52px] rounded-2xl'> */}
                <div className="flex w-[1199px] flex-col justify-center items-start gap-8 px-[140px] py-[60px]">
                    <div className='flex flex-col justify-center items-start  gap-2.5 self-stretch'>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-1'>
                                <img
                                    class="w-5 h-5"
                                    src='source/Calendar.svg'
                                />
                                <label className='text-[#8A8998] text-lg not-italic font-medium leading-[normal] tracking-[0.72px] uppercase'>April 7th - june 11th</label>
                            </div>
                            <div className='flex items-center gap-1'>
                                <img className='w-5 h-5'
                                src='source/Category.svg'/>
                                <label className='text-[#8A8998] text-lg not-italic font-medium leading-[normal] tracking-[0.72px] uppercase'>7 Modules</label>
                            </div>
                        </div>
                        <div className='self-stretch text-black text-[40px] not-italic font-semibold leading-[48px] tracking-[-0.4px]'>
                            Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future
                        </div>
                    </div>
                    <img className='w-[789px] h-[525px]'
                    src=''>
                    </img>
                    <div className='flex flex-col items-start gap-2'>
                        <label className='text-black text-[32px] not-italic font-semibold leading-[normal] tracking-[-0.32px]'>
                        Abstract
                        </label>
                        <p className='text-[#8A8998] text-base not-italic font-normal leading-[25px] w-[790px]'>
                        Cell images contain a vast amount of quantifiable information about the status of the cell: for example, whether it is diseased, whether it is responding to a drug treatment, or whether its function has been disrupted by a genetic mutation. We aim to go beyond measuring individual cell features that biologists already know are relevant to a particular disease. Instead, in a strategy called image-based profiling, often using the Cell Painting assay, we extract hundreds of features of cells from images. Just like transcriptional profiling, the similarities and differences in the patterns of extracted features reveal connections among diseases, drugs, and genes and are a rich source for machine learning.  We are harvesting similarities in image-based profiles to identify how diseases, drugs, and genes affect cells, which can uncover the impact of drugs and genes, predict assay outcomes, discover disease-associated phenotypes, identify the functional impact of disease-associated alleles, and find novel therapeutic candidates.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <div className='text-black text-[32px] not-italic font-semibold leading-[normal] tracking-[-0.32px]'>
                        Modules
                        </div>
                        <div className='flex w-[790px] items-start gap-2 border px-5 py-4 rounded-lg border-solid border-[rgba(201,201,207,0.40)]'>
                            <label className='text-black text-base not-italic font-medium leading-[normal] tracking-[-0.16px] w-[718px]'>Module 1 : How to do this (Anne Carpenter)</label>
                            <img src='source/Arrow.svg'></img>
                        </div>
                        <div className='flex w-[790px] items-start gap-2 border px-5 py-4 rounded-lg border-solid border-[rgba(201,201,207,0.40)]'>
                            <label className='text-black text-base not-italic font-medium leading-[normal] tracking-[-0.16px] w-[718px]'>Module 1 : How to do this (Anne Carpenter)</label>
                            <img src='source/Arrow.svg'></img>
                        </div>
                        <div className='flex w-[790px] items-start gap-2 border px-5 py-4 rounded-lg border-solid border-[rgba(201,201,207,0.40)]'>
                            <label className='text-black text-base not-italic font-medium leading-[normal] tracking-[-0.16px] w-[718px]'>Module 1 : How to do this (Anne Carpenter)</label>
                            <img src='source/Arrow.svg'></img>
                        </div>

                    </div>
                    <div className='flex flex-col items-start gap-7 self-stretch'>
                        <label className='text-black text-[32px] not-italic font-semibold leading-[normal] tracking-[-0.32px]'>
                        Presenters
                        </label>
                        <div className='flex flex-col items-start gap-12 self-stretch'>
                            <div className='flex flex-col justify-center items-start gap-2 self-stretch'>
                                <img src=''
                                className='w-[104px] h-[104px] fill-[#D9D9D9]'></img>
                                <div className='flex flex-col items-start gap-2 self-stretch'>
                                    <label className='text-black text-2xl not-italic font-semibold leading-[normal] tracking-[-0.24px] self-stretch'>
                                    Anne carpenter
                                    </label>
                                    <p className='text-[#8A8998] text-lg not-italic font-normal leading-[27px] self-stretch'>
                                    Institute Scientist and Imaging Platform Director, Broad 
                                    </p>
                                    <p className='text-[#8A8998] text-base not-italic font-normal leading-[25px] w-[790px]'>
                                    Anne Carpenter is senior director of the Imaging Platform at Broad Institute of MIT and Harvard, where she is also an institute scientist. With a strong background in cell biology, microscopy, and computational biology, her expertise is in developing and applying methods for extracting quantitative information from biological images, especially in a high-throughput manner.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-2 self-stretch'>
                                <img src=''
                                className='w-[104px] h-[104px] fill-[#D9D9D9]'></img>
                                <div className='flex flex-col items-start gap-2 self-stretch'>
                                    <label className='text-black text-2xl not-italic font-semibold leading-[normal] tracking-[-0.24px] self-stretch'>
                                    Anne carpenter
                                    </label>
                                    <p className='text-[#8A8998] text-lg not-italic font-normal leading-[27px] self-stretch'>
                                    Institute Scientist and Imaging Platform Director, Broad 
                                    </p>
                                    <p className='text-[#8A8998] text-base not-italic font-normal leading-[25px] w-[790px]'>
                                    Anne Carpenter is senior director of the Imaging Platform at Broad Institute of MIT and Harvard, where she is also an institute scientist. With a strong background in cell biology, microscopy, and computational biology, her expertise is in developing and applying methods for extracting quantitative information from biological images, especially in a high-throughput manner.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-2 self-stretch'>
                                <img src=''
                                className='w-[104px] h-[104px] fill-[#D9D9D9]'></img>
                                <div className='flex flex-col items-start gap-2 self-stretch'>
                                    <label className='text-black text-2xl not-italic font-semibold leading-[normal] tracking-[-0.24px] self-stretch'>
                                    Anne carpenter
                                    </label>
                                    <p className='text-[#8A8998] text-lg not-italic font-normal leading-[27px] self-stretch'>
                                    Institute Scientist and Imaging Platform Director, Broad 
                                    </p>
                                    <p className='text-[#8A8998] text-base not-italic font-normal leading-[25px] w-[790px]'>
                                    Anne Carpenter is senior director of the Imaging Platform at Broad Institute of MIT and Harvard, where she is also an institute scientist. With a strong background in cell biology, microscopy, and computational biology, her expertise is in developing and applying methods for extracting quantitative information from biological images, especially in a high-throughput manner.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           {/* </div> */}
        </div>
    </main>
  );
}

import React, { useState } from 'react'
import styles from './CounterArea.module.scss'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

function CounterArea() {
    const [counterOn, setCounterOn] = useState(false);
    
    return (
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <div className='bg-section mt-20 py-[20px] md:py-[50px] lg:py-[80px] md:px-10 lg:px-20'>
                <div className='grid grid-cols-4 gap-5'>
                    <div className={styles['single-counter']}>
                        <div className={styles['counter-count']}>
                            {counterOn &&
                                <CountUp start={0} end={40} duration={2} delay={0} style={{
                                    fontWeight: 700,
                                    fontSize: '2.3rem'
                                }} />
                            }
                            <span style={{
                                fontWeight: 700,
                                fontSize: '2.3rem'
                            }}>K</span>
                        </div>
                        <span className={styles['count-para']}>Total Staff</span>
                    </div>
                    <div className={styles['single-counter']}>
                        <div className={styles['counter-count']}>
                            {counterOn &&
                                <CountUp start={0} end={15} duration={2} delay={0} style={{
                                    fontWeight: 700,
                                    fontSize: '2.3rem'
                                }} />
                            }
                            <span style={{
                                fontWeight: 700,
                                fontSize: '2.3rem'
                            }}>K</span>
                        </div>
                        <span className={styles['count-para']}>Patients Bed</span>
                    </div>
                    <div className={styles['single-counter']}>
                        <div className={styles['counter-count']}>
                            {counterOn &&
                                <CountUp start={0} end={512} duration={2} delay={0} style={{
                                    fontWeight: 700,
                                    fontSize: '2.3rem'
                                }} />
                            }
                            <span style={{
                                fontWeight: 700,
                                fontSize: '2.3rem'
                            }}>K</span>
                        </div>
                        <span className={styles['count-para']}>Consult Room</span>
                    </div>
                    <div className={styles['single-counter']}>
                        <div className={styles['counter-count']}>
                            {counterOn &&
                                <CountUp start={0} end={15} duration={2} delay={0} style={{
                                    fontWeight: 700,
                                    fontSize: '2.3rem'
                                }} />
                            }
                            <span style={{
                                fontWeight: 700,
                                fontSize: '2.3rem'
                            }}>K</span>
                        </div>
                        <span className={styles['count-para']}>ICU Support</span>
                    </div>
                </div>
            </div>
        </ScrollTrigger>
    )
}

export default CounterArea
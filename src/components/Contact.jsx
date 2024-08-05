import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import moment from 'moment';

const Contact = React.memo(() => {
  const { token } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [date, setDate] = useState('');
  const [isLimitDateExpired, setIsLimitDateExpired] = useState(false);

  useEffect(() => {
    if (token) {
      axios.get(`http://192.168.1.6:3001/invitations/${token}`)
        .then(response => {
          setInvitation(response.data);
        })
        .catch(error => {
          console.error('Error fetching invitation:', error);
        });
    } else {
      console.error('Empty Token');
    }
  }, [token]);

  useEffect(() => {
    if (invitation) {
      setDate(moment(invitation.limit_date).format('DD/MM/YYYY'));
      setIsLimitDateExpired(new Date() > new Date(invitation.limit_date));
    }
  }, [invitation]);

  const handleRsvp = useCallback((status) => {
    if (invitation) {
      axios.post(`http://192.168.1.6:3001/invitations/${invitation.token}/rsvp`, { rsvp_status: status })
        .then(response => {
          axios.post('http://localhost:3001/generate-qrcode', { token: invitation.token })
            .then(qrResponse => {
              // Actualizar el estado con el código QR
              setInvitation({ ...invitation, status, qr_code: qrResponse.data.qrCode });
            })
            .catch(error => {
              console.error('Error generating QR code:', error);
            });
        })
        .catch(error => {
          console.error('Error updating RSVP status:', error);
        });
    }
  }, [invitation]);

  const shakeAnimation = {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      y: [0, 5, -5, 5, -5, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
      },
    },
  };

  return (
    invitation ? (
      invitation.status === "si" ? (
        <section className="relative w-full h-full mx-auto items-center bg-confirmar bg-cover bg-no-repeat bg-center p-[50px] ring-1 ring-black/5 pt-[50px] pb-[50px]">
          <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className='flex-[0.75] bg-white/10 p-8 rounded-2xl bg-opacity-40 backdrop-blur-[5px]'
              transition={{ duration: 1 }}
            >
              <h3 className={`${styles.sectionHeadText} text-center`}>Gracias por tu respuesta</h3>
              <p className={`${styles.sectionSubText} text-center text-white pt-10`}>Encuentra tu pase de entrada</p>
              <div className='mt-12 flex flex-col gap-2'>
                <span className='text-white font-medium text-center'>Familia</span>
                <h3 className={styles.sectionRVSP}>{invitation.name}</h3>
                <span className='text-white font-medium text-center'>Número de pases</span>
                <h3 className={styles.sectionRVSP}>{invitation.number}</h3>

                <div className="flex justify-center items-center">
                  <img className="w-[200px] h-[200px] object-contain" src={invitation.qr_code} alt="QR Code" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className='flex-[0.75] bg-white/10 p-8 rounded-2xl bg-opacity-40 backdrop-blur-[5px] mx-auto my-auto'
              transition={{ duration: 1 }}
            >
              <h3 className={`${styles.sectionHeadText} text-center`}>Tu asistencia es mejor regalo</h3>
              <p className={`${styles.sectionSubText} text-center text-white pt-10`}>Pero si insistes...</p>
              <div className='flex flex-col gap-2'>

                {/* Sobre animado */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={shakeAnimation.animate}
                  className="flex items-center justify-center text-[100px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                >
                  ✉️
                </motion.div>

                <span className='text-white font-medium text-center'>Queremos que la pases tan bien como nosotros,</span>
                <span className='text-white font-medium text-center'>por eso decidimos que esta celebracion es solo para adultos.</span>
                <div className="flex gap-10 justify-center">
                  {/* Otros elementos */}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : invitation.status === "no" ? (
        <section className="relative w-full h-full mx-auto items-center bg-confirmar bg-cover bg-no-repeat bg-center p-[50px] ring-1 ring-black/5 pt-[50px] pb-[50px]">
          <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className='flex-[0.75] bg-white/10 p-8 rounded-2xl bg-opacity-40 backdrop-blur-[5px]'
              transition={{ duration: 1 }}
            >
              <h3 className={`${styles.sectionHeadText} text-center`}>Gracias por tu respuesta</h3>
              <p className={`${styles.sectionSubText} text-center text-white pt-10`}>Ya has seleccionado tu respuesta</p>
              <div className='mt-12 flex flex-col gap-2'>
              </div>
            </motion.div>
            <motion.div
              variants={slideIn("right", "tween", 0.2, 1)}
              className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
            >
            </motion.div>
          </div>
        </section>
      ) : isLimitDateExpired ? (
        <section className="relative w-full h-full mx-auto items-center bg-confirmar bg-cover bg-no-repeat bg-center p-[50px] ring-1 ring-black/5 pt-[50px] pb-[50px]">
          <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className='flex-[0.75] bg-white/10 p-8 rounded-2xl bg-opacity-40 backdrop-blur-[5px]'
              transition={{ duration: 1 }}
            >
              <h3 className={`${styles.sectionHeadText} text-center`}>La fecha limite expiro</h3>
              <p className={`${styles.sectionSubText} text-center text-white pt-10`}>La fecha limite fue: {date}</p>
            </motion.div>
            <motion.div
              variants={slideIn("right", "tween", 0.2, 1)}
              className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
            >
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="relative w-full h-full mx-auto items-center bg-confirmar bg-cover bg-no-repeat bg-center p-[50px] ring-1 ring-black/5 pt-[50px] pb-[50px]">
          <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className='flex-[0.75] bg-white/10 p-8 rounded-2xl bg-opacity-40 backdrop-blur-[5px]'
              transition={{ duration: 1 }}
            >
              <h3 className={`${styles.sectionHeadText} text-center`}>Confirma tu asistencia</h3>
              <p className={`${styles.sectionSubText} text-center text-white pt-10`}>Tienes hasta el {date} para hacerlo</p>
              <div className='mt-12 flex flex-col gap-2'>
                <span className='text-white font-medium text-center'>Familia</span>
                <h3 className={styles.sectionRVSP}>{invitation.name}</h3>
                <span className='text-white font-medium text-center'>Número de pases</span>
                <h3 className={styles.sectionRVSP}>{invitation.number}</h3>
                <div className="flex gap-10 justify-center">
                  <button
                    type='btn'
                    className='bg-[#7d7d7d] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
                    onClick={() => handleRsvp("si")}>
                    Confirmar
                  </button>
                  <button
                    type='btn'
                    className='bg-[#7d7d7d] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
                    onClick={() => handleRsvp("no")}>
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className='flex-[0.75] bg-white/10 p-8 rounded-2xl bg-opacity-40 backdrop-blur-[5px] mx-auto my-auto'
              transition={{ duration: 1 }}
            >
              <h3 className={`${styles.sectionHeadText} text-center`}>Tu asistencia es mejor regalo</h3>
              <p className={`${styles.sectionSubText} text-center text-white pt-10`}>Pero si insistes...</p>
              <div className='flex flex-col gap-2'>

                {/* Sobre animado */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={shakeAnimation.animate}
                  className="flex items-center justify-center text-[100px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                >
                  ✉️
                </motion.div>

                <span className='text-white font-medium text-center'>Queremos que la pases tan bien como nosotros,</span>
                <span className='text-white font-medium text-center'>por eso decidimos que esta celebracion es solo para adultos.</span>
                <div className="flex gap-10 justify-center">
                  {/* Otros elementos */}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )
    ) : null
  );
});

export default SectionWrapper(Contact, "contact");
import { motion } from "framer-motion";

import { styles } from "../styles";

const Hero = () => {



  return (
    <section className={`relative w-full h-screen mx-auto bg-inicio bg-cover bg-no-repeat bg-center bg-fixed z-2`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >

      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>

        <motion.div className="sticky top-0"
          initial={{ opacity: 0 }} // Estado inicial, opacidad a 0
          animate={{ opacity: 1 }} // Estado final, opacidad a 1 /* Abajo Duración de la animación en segundos*/
          transition={{ duration: 3 }}>


          <div className="relative justify-center items-center mx-auto">
            <div className='flex justify-center items-start p-2 mx-auto'>
              <h2 className="font-nombres text-[50px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Mari x Jose</h2>
            </div>

            <div className='w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2 mx-auto'>
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className='w-3 h-3 rounded-full bg-white mb-1'
              />
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;

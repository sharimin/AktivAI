import { create } from "apisauce";

const api = create({
    baseURL:'http://192.168.0.172:1337/api',
    headers: { 
        "X-API-Key":"94272d5ed4eace20d523d55c7d8c138aebf61badde7029c1cc4ae22afc82f287093b1868e14bebb269dc21eb8e990c9fb4391807513b625d7592e6a594d36d5758653454bd53469477d1fe720441398acc69b22e0b5cb883fa570d77af374748846834916f1e4ba0d9200a30b9f34a742cfefcb6cb0da14e799b0813dde66999"
      },
  })
 
  const getSlider=()=>api.get('/sliders?populate=*');

  export default{
    getSlider
  }
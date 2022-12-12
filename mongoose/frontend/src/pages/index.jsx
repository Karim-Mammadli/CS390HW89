import {Link} from "react-router-dom";
import "./Home.css";
import "./Home2.css";
import "./gif.css";

export function Index() {

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>

    <Link to="/create"> 
    <button class="cybr-btn">
  Create Post<span aria-hidden>_</span>
  <span aria-hidden class="cybr-btn__glitch">Cyber_</span>
  <span aria-hidden class="cybr-btn__tag">R20</span>
</button>

</Link>


<Link to="/view"> 
<button class="cybrT-btn">
  View Posts<span aria-hidden>_</span>
  <span aria-hidden class="cybrT-btn__glitch">Buttons_</span>
  <span aria-hidden class="cybrT-btn__tag">R77</span>
</button>
</Link>
    </div>
  );
}

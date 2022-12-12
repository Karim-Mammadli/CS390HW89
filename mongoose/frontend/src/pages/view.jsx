import {useEffect} from "react";
import {useState} from "react";
import "./gif.css";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  const [editingTitle, setEditingTitle] = useState(null);
  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, []);
  async function deletePost(title) {
    const resp = await fetch("http://localhost:3000/blog/delete-post", { 
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title })
     });
    const json = await resp.json();
    setPosts(json);
   }
  function editPost(title) {
    setEditingTitle(title);
   }
  return (

    <div>
      <Link to="/" class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
<span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Home</span>
<span class="relative invisible">Home</span>
</Link>
      <div>
        {editingTitle && (
          <EditPost
            title={editingTitle}
            updatePosts={(json) => {
              setEditingTitle(null);
              setPosts(json);
            }}
        />
      )}
      </div >


      <div>
        {posts.map((post) => (
          <div
            key={post.title}
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >


            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
            <div>
            <button onClick={() => { editPost(post.title)}}>
<a href="#_" className="relative px-2 py-0 font-medium text-white group">
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
<span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
<span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
 <span className="relative">Edit</span>
</a>
</button>
&nbsp;
<button onClick={() => { deletePost(post.title) }}>           
<a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
<span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
<span className="relative px-1 py-1 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
<span className="relative text-white">Delete</span>
</span>
</a>
</button> 
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}

function EditPost({ title: oldTitle, updatePosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");



  async function handleSubmit(e) {
    setError("")
    e.preventDefault();
    const requestData = JSON.stringify({title, content, password, oldTitle});
    const headers = { "content-type": "application/json" };
    const resp = await fetch("http://localhost:3000/blog/edit-post", {
      method: "post",
      headers,
      body: requestData,
    });

    const json = await resp.json();

    if (json.error) {
      setError(json.error);
      return;
    }

    setDone(true);
    updatePosts(json);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>Editing Post: <b>{oldTitle}</b></div>
      <input placeholder="New Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      type="text" id="small-input" className="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      <div>
      <textarea value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        id="message" rows="4" className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Edit your message">

        </textarea>
      </div>
      <div>
        <input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" id="small-input" placeholder = "password pls" className="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
Edit</button>
      {error && <div>{error}</div>}
    </form>
  );
}

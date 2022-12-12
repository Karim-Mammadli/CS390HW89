import {useState} from "react";
import {Link} from "react-router-dom";
import "./gif.css";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    setError("")
    e.preventDefault();

    const requestData = JSON.stringify({title, content, password});

    const headers = { "content-type": "application/json" };

    const resp = await fetch("http://localhost:3000/blog/create-post", {
      method: "post",
      headers,
      body: requestData,
    });

    const json = await resp.json();

    if (json.error) {
      console.json.error;
      setError(json.error);
      return;
    }

    setDone(true);
  }


  if (done) {
    return (
      <div className="secondgif" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div>
        <Link to="/view">Your post has been created, I order you to go check it out. Click me</Link>
      </div>
      </div>
    );
  }


  return (
    <div className = "giftime" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <section className="p-20 dark:bg-gray-800 dark:text-gray-50">
	<form onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
	
    <fieldset className="grid grid-cols-3 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
			<div className="space-y-2 col-span-half lg:col-span-1">
				<p className="font-medium">Create your Post</p>
			</div>
    
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label className="text-sm">Title</label>
				<input
          placeholder="Title"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
          className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
				
        </div>
				<div className="col-span-full sm:col-span-3">
					<label className="text-sm">Password</label>
					<input
          type="password" 
          placeholder="123456"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
          className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
				</div>

				<div className="col-span-full">
					<label className="text-sm">Description</label>
					<textarea 
          placeholder="Once upon a time..."
          onChange={(e) => setContent(e.currentTarget.value)}
          value={content}
          className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"></textarea>
				</div>

				<button 
        className="px-5 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800">
          Create
        </button>
			</div>
    
      
		</fieldset>
    </form>
    </section>
    </div>
  );
}

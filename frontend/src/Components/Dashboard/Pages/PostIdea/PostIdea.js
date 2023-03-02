import React from 'react';
import "./PostIdea.css";

const PostIdea = () => {

    

    return (
        <div className="backContainer">
            <div className="content">
                <form onSubmit={postIdea}>
                    <div className="titleLabel">
                        <img src="" alt="" />
                        <label id="label">Post Final Year Project Idea</label>
                    </div>
                    <div className="fieldsContainer">
                        <div id="titleField">
                            <label htmlFor="titleTextbox">Idea Title:</label>
                            <input type="text" id="titleTextbox" />
                        </div>

                        <div id="descriptionField">
                            <label htmlFor="descriptionTextarea">Description:</label>
                            <textarea name="" id="descriptionTextarea" ></textarea>
                        </div>

                        <div className="buttonsField">
                            <button id="BackButton">Back</button>
                            <button id="PostButton">Post Idea</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostIdea

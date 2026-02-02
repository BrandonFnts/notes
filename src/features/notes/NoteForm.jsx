import { useState } from "react";
import { LoadingButton } from "@/components";

export const NoteForm = ({ tags, tagsLoading, onSubmit, error }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    
    const [selectedColor, setSelectedColor] = useState("#FFFFE0"); 
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const colorOptions = [
        { name: "Amarillo", value: "#FFFFE0", hex: "#FFFFE0" },
        { name: "Verde", value: "#90EE90", hex: "#90EE90" },
        { name: "Azul", value: "#ADD8E6", hex: "#ADD8E6" },
        { name: "Rosa", value: "#FFB6C1", hex: "#FFB6C1" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);
        
        await onSubmit({ 
            title, 
            content, 
            tagIds: selectedTags,
            color: selectedColor
        });

        setTitle("");
        setContent("");
        setSelectedTags([]);
        setSelectedColor("#FFFFE0");
        setIsSubmitting(false);
    };

    const toggleTag = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(prev => prev.filter(id => id !== tagId));
        } else {
            setSelectedTags(prev => [...prev, tagId]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Title</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Write a title..." 
                    className="input input-bordered w-full" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Content</span>
                </label>
                <textarea 
                    className="textarea textarea-bordered h-24" 
                    placeholder="Details of the note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Color</span>
                </label>
                <div className="flex gap-3">
                    {colorOptions.map((color) => (
                        <div 
                            key={color.value}
                            onClick={() => setSelectedColor(color.value)}
                            className={`w-8 h-8 rounded-full cursor-pointer transition-transform border border-base-300 ${
                                selectedColor === color.value ? 'ring-2 ring-primary scale-110' : ''
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
            
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Tags</span>
                </label>
                
                {tagsLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <div 
                                key={tag.id}
                                onClick={() => toggleTag(tag.id)}
                                className={`badge cursor-pointer p-3 select-none transition-colors ${
                                    selectedTags.includes(tag.id) 
                                    ? 'badge-primary font-bold' 
                                    : 'badge-outline opacity-70 hover:opacity-100'
                                }`}
                            >
                                {tag.name}
                            </div>
                        ))}
                        {tags.length === 0 && <span className="text-xs text-gray-400">No tags available</span>}
                    </div>
                )}
            </div>

            {error && (
                <div className="alert alert-error text-sm py-2 rounded-lg">
                    <span>{error.message || "Error saving note"}</span>
                </div>
            )}

            <div className="mt-2">
                <LoadingButton 
                    label="Save Note" 
                    isLoading={isSubmitting} 
                    type="submit"
                    className="btn-primary w-full"
                />
            </div>
        </form>
    );
};
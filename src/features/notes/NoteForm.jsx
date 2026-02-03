import { useState, useEffect } from "react";
import { LoadingButton } from "@/components";

export const NoteForm = ({ tags, tagsLoading, onSubmit, error, initialData }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedColor, setSelectedColor] = useState("#FFFFE0");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setSelectedColor(initialData.color || "#FFFFE0");
            const tagIds = initialData.tags ? initialData.tags.map(t => t.id) : [];
            setSelectedTags(tagIds);
        } else {
            setTitle("");
            setContent("");
            setSelectedColor("#FFFFE0");
            setSelectedTags([]);
        }
    }, [initialData]);

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
                <label className="label"><span className="label-text font-semibold">Title</span></label>
                <input type="text" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Content</span></label>
                <textarea className="textarea textarea-bordered h-24" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>

            <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Color</span></label>
                <div className="flex gap-3">
                    {colorOptions.map((opt) => (
                        <div key={opt.value} onClick={() => setSelectedColor(opt.value)} 
                             className={`w-8 h-8 rounded-full cursor-pointer border border-base-300 ${selectedColor === opt.value ? 'ring-2 ring-primary scale-110' : ''}`} 
                             style={{ backgroundColor: opt.hex }} title={opt.name} />
                    ))}
                </div>
            </div>

            {/* Tags (Igual que antes) */}
            <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Tags</span></label>
                {tagsLoading ? <span className="loading loading-dots loading-xs"></span> : (
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <div key={tag.id} onClick={() => toggleTag(tag.id)} className={`badge cursor-pointer p-3 select-none ${selectedTags.includes(tag.id) ? 'badge-primary font-bold' : 'badge-outline opacity-70'}`}>
                                {tag.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && <div className="alert alert-error text-sm py-2 rounded-lg"><span>{error.message || "Error"}</span></div>}

            <div className="mt-2">
                <LoadingButton 
                    label={initialData ? "Update Note" : "Create Note"} 
                    isLoading={isSubmitting} 
                    type="submit"
                    className={`w-full ${initialData ? "btn-warning" : "btn-primary"}`}
                />
            </div>
        </form>
    );
};
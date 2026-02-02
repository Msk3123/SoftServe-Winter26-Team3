import type { DeleteFunction, FetchListFunction, FetchOneFunction, PatchFunction, PostFunction, PutFunction } from "../types/api.types";
import type { Tag, TagCreate } from "../types/tags.types";
import { defaultParams, deleteItem, getItem, getPaginatedData, patchItem, postItem, putItem } from "./api";

export const  getAllTags:FetchListFunction<Tag> = async (params = defaultParams ) => {
    return await getPaginatedData<Tag>("tags", params);

};
export const getTag:FetchOneFunction<Tag> = async (id)=>{
    return await getItem("tags",id);
}
export const postTag:PostFunction<TagCreate,Tag>= async(data)=>{
    return await postItem("tags",data);
}
export const putTag:PutFunction<TagCreate>= async(id,data)=>{
    return await putItem("tags",id,data);
}
export const patchTag:PatchFunction<TagCreate>= async(id,data)=>{
    return await patchItem("tags",id,data);
}
export const deleteTag:DeleteFunction = async (id)=>{
    return deleteItem("tags",id);
};
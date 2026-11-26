export function objectKey(category,slug,id,format){
 if(!['dj-edits','dj-mixes','dj-sets'].includes(category)||![slug,id].every(v=>typeof v==='string'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v))||!['mp3','wav'].includes(format))throw Error('Invalid download reference');
 return `${category}/${slug}/${id}.${format}`;
}
export function downloadUrl(releaseId,id){
 if(![releaseId,id].every(v=>typeof v==='string'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v)))throw Error('Invalid download ID');
 return `https://downloads.notanangeldj.com/download/${releaseId}/${id}`;
}

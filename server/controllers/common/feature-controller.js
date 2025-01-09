import Feature from "../../models/Feature.js"

export const addFeatureImage = async (req,res)=>{
    try{
        const {image} = req.body
        const featureImages = new Feature({image})
        await featureImages.save()
        res.status(201).json({
            status : true,
            data : featureImages
        })

    } catch(e){
        console.log(e)
        res.status(500).json({
            success : false,
            message : "Some error occured!"
        })
    }
}


export const getFeatureImage = async (req,res)=>{
    try{
        const images = await Feature.find({})
        res.status(200).json({
            success : true,
            data : images
        })

    } catch(e){
        console.log(e)
        res.status(500).json({
            success : false,
            message : "Some error occured!"
        })
    }
}

export const deleteFeatureImage = async (req,res)=>{
    try{
        const {id} = req.params
        const feature = await Feature.findByIdAndDelete(id)

        if(!feature) return res.status(404).json({
            success : false,
            message : "Image not found"
        })
        
        res.status(200).json({
            success : true,
            message : 'Image delete Successfully'
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Some Error Occured!"
        })
    }
}


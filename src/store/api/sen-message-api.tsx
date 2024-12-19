import { api } from ".";

export const sendMessageApi = api.injectEndpoints({
    endpoints: (build) => ({
        sendMessage: build.mutation({
            query: (body) => ({
                method: "POST",
                body
            }),
        }),
    }),
})

export const {useSendMessageMutation} = sendMessageApi
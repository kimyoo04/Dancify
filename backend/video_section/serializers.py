from rest_framework import serializers

from .models import VideoSection
from posts.models import DancerPost


class VideoSectionListSerializer(serializers.Serializer):
    dancerPost = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()

    def get_dancerPost(self, instance):
        dancer_post = DancerPost.objects.get(post_id=instance.post_id)
        post = {
            'postId': dancer_post.post_id,
            'title': dancer_post.title,
            'userId': dancer_post.user.user_id,
            'nickname': dancer_post.user.nickname,
            'content': dancer_post.content,
            'createDate': dancer_post.create_date,
            'views': dancer_post.views,
            'feedbackPrice': dancer_post.feedback_price
        }
        return post

    def get_sections(self, instance):
        sections = VideoSection.objects.filter(
            dancer_post=DancerPost.objects.get(post_id=instance.post_id)).order_by('section_number')
        # 직렬화하기 위해 리스트로 변환
        serialized_sections = []
        for section in sections:
            serialized_section = {
                'sectionId': section.section_id,
                'video': section.video,
                'thumbnail': section.thumbnail,
                'keypoints': section.keypoints,
            }
            serialized_sections.append(serialized_section)
        return serialized_sections

    class Meta:
        model = VideoSection
        fields = ['dancerPost', 'sections']
        ref_name = 'VideoSectionListSerializer'

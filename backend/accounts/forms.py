from django import forms
from accounts.models import User


class ProfileForm(forms.ModelForm):

    profileImage = forms.URLField(label='profile_image')

    class Meta:
        model = User
        fields = ['profileImage', 'email', 'nickname', 'description']

    # def email_is_valid(self, data):
    #     if self.Meta.model.objects.filter(**{'email': data.get('email')}).exists():
    #         return False
    #     return True

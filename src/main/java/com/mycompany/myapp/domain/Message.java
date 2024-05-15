package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "uploads")
    private String uploads;

    @Column(name = "pinned")
    private Integer pinned;

    @Column(name = "timestamp")
    private Long timestamp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = { "workspace", "messages", "members" }, allowSetters = true)
    private Channel channel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "messages", "mentions", "workspaces", "channels" }, allowSetters = true)
    private UserProfile userProfile;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "message")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "message", "userProfile" }, allowSetters = true)
    private Set<Mention> mentions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Message id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUploads() {
        return this.uploads;
    }

    public Message uploads(String uploads) {
        this.setUploads(uploads);
        return this;
    }

    public void setUploads(String uploads) {
        this.uploads = uploads;
    }

    public Integer getPinned() {
        return this.pinned;
    }

    public Message pinned(Integer pinned) {
        this.setPinned(pinned);
        return this;
    }

    public void setPinned(Integer pinned) {
        this.pinned = pinned;
    }

    public Long getTimestamp() {
        return this.timestamp;
    }

    public Message timestamp(Long timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public Channel getChannel() {
        return this.channel;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public Message channel(Channel channel) {
        this.setChannel(channel);
        return this;
    }

    public UserProfile getUserProfile() {
        return this.userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Message userProfile(UserProfile userProfile) {
        this.setUserProfile(userProfile);
        return this;
    }

    public Set<Mention> getMentions() {
        return this.mentions;
    }

    public void setMentions(Set<Mention> mentions) {
        if (this.mentions != null) {
            this.mentions.forEach(i -> i.setMessage(null));
        }
        if (mentions != null) {
            mentions.forEach(i -> i.setMessage(this));
        }
        this.mentions = mentions;
    }

    public Message mentions(Set<Mention> mentions) {
        this.setMentions(mentions);
        return this;
    }

    public Message addMentions(Mention mention) {
        this.mentions.add(mention);
        mention.setMessage(this);
        return this;
    }

    public Message removeMentions(Mention mention) {
        this.mentions.remove(mention);
        mention.setMessage(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Message)) {
            return false;
        }
        return getId() != null && getId().equals(((Message) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", uploads='" + getUploads() + "'" +
            ", pinned=" + getPinned() +
            ", timestamp=" + getTimestamp() +
            "}";
    }
}
